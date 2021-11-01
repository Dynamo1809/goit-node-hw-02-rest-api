const { Conflict } = require('http-errors')
const { User } = require('../../models')

const signup = async (req, res) => {
  const { password, email } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = new User({ email })
  newUser.generateAvatar(email)
  newUser.setPassword(password)
  await newUser.save()

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

// const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// await User.create({ email, password: hashPassword })

module.exports = signup
