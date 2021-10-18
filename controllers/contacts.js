const { NotFound } = require('http-errors')
const contactsOperations = require('../model/')

const getAll = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsOperations.getContactById(contactId)
  if (!contact) {
    throw new NotFound(`Contact with id: '${contactId}' not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact
    }
  })
}

const add = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

const updateById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateContact(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact with id: '${contactId}' not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

const deleteById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId)
  if (!result) {
    throw new NotFound(`Contact with id: '${contactId}' not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete'
  })
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}
