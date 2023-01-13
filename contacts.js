const { readFile, writeFile } = require("fs/promises");
require("colors");
const { v4: uuidv4 } = require("uuid");

const contactsPath = "./db/contacts.json";

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const res = await listContacts();

    return res.filter((contact) => contact.id === contactId);
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    if (
      contacts.some(
        (contact) => contact.name === name && contact.email === email
      )
    ) {
      return console.log(
        `The contact name: ${name} with email: ${email} already exist, add someone new please`
          .bgBlue
      );
    }

    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  [removed] = contacts.splice(idx, 1);

  await writeFile(contactsPath, JSON.stringify(contacts));
  return removed;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
