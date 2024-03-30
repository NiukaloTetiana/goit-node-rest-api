import Joi from "joi";

import { emailRegExp } from "../constants/emailRegExp.js";

export const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

export const loginUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
});
