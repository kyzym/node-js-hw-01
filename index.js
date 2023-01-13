import { program } from "commander";
import chalk from "chalk";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const getContact = await getContactById(id);
      if (!getContact) {
        return console.log(
          chalk.bgRed(`the contact with id-- ${id} not found`)
        );
      }
      console.log(getContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      if (!newContact) {
        return console.log(chalk.bgRed(`we cant add ${name}`));
      }
      console.log(newContact);

      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
  //
};
invokeAction(argv);
