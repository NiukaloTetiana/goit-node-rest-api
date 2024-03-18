import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactsById,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await listContacts();

  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export const createContact = async (req, res) => {
  const result = await addContact(req.body);

  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await updateContactsById(id, req.body);

  if (!result) {
    throw HttpError(400, "Body must have at least one field");
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
