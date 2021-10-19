const fs = require('fs/promises')
const path = require('path')
const { Contact } = require('../db/contactModel')
// const contacts = require('./contacts.json')

const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

// const listContacts = async () => contacts
const listContacts = async () => {
  const contacts = await Contact.find({})
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(({ _id }) => _id.toString() === contactId.toString())

  if (contactIndex === -1) {
    return null
  }

  return contacts[contactIndex]
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(contact => contact.id.toString() === contactId.toString())

  if (contactIndex === -1) {
    return null
  }

  contacts.splice(contactIndex, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return true
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { ...body, id: v4() }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(contact => contact.id.toString() === contactId.toString())

  if (contactIndex === -1) {
    return null
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return contacts[contactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
