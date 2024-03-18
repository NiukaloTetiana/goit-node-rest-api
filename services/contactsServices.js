import { nanoid } from "nanoid";
import path from "path";
import fs from "fs/promises";

export const contactsPath = path.resolve("db", "contacts.json");

export const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);

  if (!contact) {
    return null;
  }
  return contact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [deleteContact] = contacts.splice(index, 1);
  await updateContacts(contacts);

  return deleteContact;
}

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
}

export async function updateContactsById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...data };
  await updateContacts(contacts);

  return contacts[index];
}
