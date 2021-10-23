const { NotFound } = require('http-errors')
const { Contact } = require('../models/')

const getAll = async (req, res) => {
  const contacts = await Contact.find({})
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getById = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
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

const add = async (req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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

const deleteById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findOneAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Contact with id: '${contactId}' not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete'
  })
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body

  if (favorite === undefined) {
    res.status(400).json({
      message: "missing field favorite"
    })
  }
  
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true})
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

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateStatusContact
}
