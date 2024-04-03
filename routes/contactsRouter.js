import express from "express";

import contactsControllers from "../controllers/contactsControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsControllers.getAllContacts);

contactsRouter.get(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.getOneContact
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.deleteContact
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsControllers.updateFavorite
);

export default contactsRouter;
