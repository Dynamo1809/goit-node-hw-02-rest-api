const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers
  const [bearer, token] = authorization?.split(' ')

  if (bearer !== 'Bearer') {
    throw new Unauthorized('Invalid token')
  }
  
  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    console.log("🚀 ~ id", id)
    const user = await User.findById(id)
    console.log("🚀 ~ file: authenticate.js ~ line 19 ~ authenticate ~ user", user)
    
    if (!user) {
      throw new Unauthorized('Invalid token')
    }
    req.user = user
    next()
  } catch (error) {
    error.status = 401
    next(error)
  }
}

module.exports = authenticate