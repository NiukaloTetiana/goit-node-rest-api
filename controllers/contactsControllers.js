import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactsById,
} from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const filter = favorite ? { owner, favorite } : { owner };
  const skip = (page - 1) * limit;
  const result = await listContacts(filter, { skip, limit });

  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await getContactById({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await removeContact({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  const result = await updateContactsById({ _id: id, owner }, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  const result = await updateContactsById({ _id: id, owner }, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
