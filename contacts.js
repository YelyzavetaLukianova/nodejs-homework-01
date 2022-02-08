const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const result = await listContacts();
    const dataById = result.find((contact) => contact.id === contactId);
    console.log(dataById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const result = await listContacts();
    const filteredData = JSON.stringify(
      result.filter((contact) => contact.id !== contactId)
    );
    console.table(filteredData);
    return await fs.writeFile(contactsPath, filteredData, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const result = await listContacts();
    const newContact = { name, email, phone };
    const newList = JSON.stringify([...result, newContact]);
    return await fs.writeFile(contactsPath, newList, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
