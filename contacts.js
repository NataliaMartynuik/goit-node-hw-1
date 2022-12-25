const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid")


const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function readContacts() {
    const contactsRaw = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsRaw);
    return contacts;
}

async function writeContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
    const contacts = await readContacts();
    console.log("List of contacts:");
    console.table(contacts);
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await readContacts();
    const contactById = contacts.find((contact) => contact.id === contactId)
     if (!contactById)
        return console.error(`Contact with ID ${contactId} not found!`);
    console.log(`Contact with ID ${contactId}:`);
    console.table(contactById);

    return contactById || null;
}

async function removeContact(contactId) {
    const contacts = await readContacts();
    const updateContacts = contacts.filter((contact) => contact.id !== contactId);
    await writeContacts(updateContacts);
    console.log('Contact deleted successfully! New list of contacts:');
    console.table(updateContacts);
    return updateContacts;
}

async function addContact(name, email, phone) {
    const id = nanoid();
    const newContact = { id, name, email, phone };

    const contacts = await readContacts();
    contacts.push(newContact);

    await writeContacts(contacts);
    console.log('Contact added successfully! New list of contacts:');
    console.table(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}