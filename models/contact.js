const Joi = require('joi')
const { Schema, model } = require('mongoose')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  }
},{ versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().min(2).max(30),
  favorite: Joi.boolean()
})

module.exports = { Contact, joiSchema }