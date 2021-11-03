const { Conflict } = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const { sendEmail } = require('../../helpers')
const { User } = require('../../models')

const { PORT } = process.env
console.log("🚀 ~ file: signup.js ~ line 8 ~ PORT", PORT)

const signup = async (req, res) => {
  const { password, email } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }
  const verifyToken = uuidv4()
  console.log("🚀 ~ file: signup.js ~ line 14 ~ signup ~ verifyToken", verifyToken)
  const newUser = new User({ email, verifyToken })
  newUser.generateAvatar(email)
  newUser.setPassword(password)
  await newUser.save()

  const mail = {
    to: email,
    subject: 'Підтвердження реєстрації на сайті',
    html: `
    <a
    target="_blank"
    href="http://localhost:${PORT}/api/users/verify/${verifyToken}"
    >
    Нажміть для підтвердження реєстрації
    </a>
    `
  }

  sendEmail(mail)
  res.status(201).json({
    status: 'succes',
    code: 201,
    data: {
      user: {
        email,
        subscription: newUser.subscription
      }
    }
  })
}

module.exports = signup
