import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { findUserEmail, createUser } from "../services/usersServices.js";

const { JWT_SECRET } = process.env;

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserEmail({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUserEmail({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  res.json({
    token,
  });
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
};
