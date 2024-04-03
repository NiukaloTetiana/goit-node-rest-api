import express from "express";

import usersControllers from "../controllers/usersControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  registerUserSchema,
  loginUserSchema,
  subscriptionUserSchema,
} from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(registerUserSchema),
  usersControllers.registerUser
);

usersRouter.post(
  "/login",
  validateBody(loginUserSchema),
  usersControllers.loginUser
);

usersRouter.get("/current", authenticate, usersControllers.getCurrent);

usersRouter.post("/logout", authenticate, usersControllers.logoutUser);

usersRouter.patch(
  "/",
  authenticate,
  validateBody(subscriptionUserSchema),
  usersControllers.subscriptionUpdate
);

export default usersRouter;
