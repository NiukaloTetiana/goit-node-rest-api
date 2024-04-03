import { User } from "../models/User.js";

export const findUserEmail = async (email) => {
  const user = await User.findOne(email);

  return user;
};

export const createUser = async (body) => {
  const newUser = await User.create(body);

  return newUser;
};

export const updateUser = async (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true });
