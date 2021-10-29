const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const logout = async (req, res) => {
  const { _id: id } = req.user
  console.log("🚀 ~ file: logout.js ~ line 6 ~ logout ~ id", id)
  
  const user = await User.findById(id)
  console.log("🚀 ~ file: logout.js ~ line 9 ~ logout ~ user", user)

  if (!user) {
    throw new Unauthorized('Not authorized')
  }
  
  res.status(204).send()
}

module.exports = logout
