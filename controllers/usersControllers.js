import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  findUserEmail,
  createUser,
  updateUser,
} from "../services/usersServices.js";

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
    user: { email: newUser.email, subscription: newUser.subscription },
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
  await updateUser(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await updateUser(_id, { token: null });

  res.status(204).json();
};

const subscriptionUpdate = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  await updateUser(_id, { subscription });

  res.json({
    email,
    subscription,
  });
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  getCurrent: ctrlWrapper(getCurrent),
  logoutUser: ctrlWrapper(logoutUser),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate),
};
