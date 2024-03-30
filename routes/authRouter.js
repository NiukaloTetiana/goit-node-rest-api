import express from "express";

import authControllers from "../controllers/authControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerUserSchema),
  authControllers.registerUser
);

authRouter.post(
  "/login",
  validateBody(loginUserSchema),
  authControllers.loginUser
);

export default authRouter;
