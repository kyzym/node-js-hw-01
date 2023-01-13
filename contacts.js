import { readFile, writeFile } from "node:fs/promises";
import chalk from "chalk";
import { v4 as uuidv4 } from "uuid";

const contactsPath = "./db/contacts.json";

export const listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (contactId) => {
  try {
    const res = await listContacts();
    const [result] = res.filter((contact) => contact.id === contactId);

    return result;
  } catch (err) {
    console.log(err);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    if (
      contacts.some(
        (contact) => contact.name === name && contact.email === email
      )
    ) {
      return console.log(
        chalk.bgBlue(
          `The contact name: ${name} with email: ${email} already exist, add someone new please`
        )
      );
    }

    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }

  const [removed] = contacts.splice(idx, 1);

  await writeFile(contactsPath, JSON.stringify(contacts));

  return removed;
};
