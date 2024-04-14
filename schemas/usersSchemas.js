import Joi from "joi";

import { emailRegExp } from "../constants/emailRegExp.js";
import { allowedSubscription } from "../constants/allowedSubscription.js";

export const registerUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  subscription: Joi.string().required(),
});

export const emailUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

export const loginUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

export const subscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid(...allowedSubscription)
    .required(),
});
