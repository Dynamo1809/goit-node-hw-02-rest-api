const { BadRequest } = require('http-errors')

const { sendEmail } = require('../../helpers')
const { User } = require('../../models')

const { PORT } = process.env

const verify = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new BadRequest('Missing required field email')
  }

  const user = await User.findOne({ email, verify: false })
  if (!user) {
    throw new BadRequest('Verification has already been passed or email not found')
  }

  const mail = {
    to: email,
    subject: 'Підтвердження реєстрації на сайті',
    html: `
    <a
    target="_blank"
    href="http://localhost:${PORT}/api/users/verify/${user.verifyToken}"
    >
    Нажміть для підтвердження реєстрації
    </a>
    `
  }

  sendEmail(mail)
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  })
}

module.exports = verify