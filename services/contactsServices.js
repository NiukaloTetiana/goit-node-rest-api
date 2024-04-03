import { Contact } from "../models/Contact.js";

export async function listContacts(filter = {}, query = {}) {
  const data = await Contact.find(
    filter,
    "name email phone favorite",
    query
  ).populate("owner", "email");

  return data;
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);

  return contact;
}

export async function removeContact(contactId) {
  const deleteContact = Contact.findByIdAndDelete(contactId);

  return deleteContact;
}

export async function addContact(data) {
  const newContact = await Contact.create(data);

  return newContact;
}

export async function updateContactsById(id, data) {
  const contacts = await Contact.findByIdAndUpdate(id, data, { new: true });

  return contacts;
}
