import express from "express";

import usersControllers from "../controllers/usersControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  registerUserSchema,
  loginUserSchema,
  subscriptionUserSchema,
  emailUserSchema,
} from "../schemas/usersSchemas.js";
import { upload } from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validateBody(registerUserSchema),
  usersControllers.registerUser
);

usersRouter.get("/verify/:verificationToken", usersControllers.verifyEmail);

usersRouter.post(
  "/verify",
  validateBody(emailUserSchema),
  usersControllers.resendVerifyEmail
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

usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  usersControllers.updateAvatar
);

export default usersRouter;
