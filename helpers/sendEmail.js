const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_KEY} = process.env

sgMail.setApiKey(SENDGRID_KEY)

const sendEmail = async (data) => {
  const email = { ...data, from: 'soccermaker@outlook.com' }
  try {
    sgMail.send(email)
    return true
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail