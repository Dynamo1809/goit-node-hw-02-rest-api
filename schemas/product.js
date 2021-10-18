const Joi = require('joi')

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(2).max(30).required()
})

module.exports = joiSchema
