const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp');
const { User } = require('../../models')

const updateAvatar = async (req, res, next) => {
  const { _id: id } = req.user
  const { path: tmpDir, originalname } = req.file
  
  const [extension] = originalname.split('.').reverse()
  const filename = `${id}.${extension}`
  const avatarsDir = path.join(__dirname, '../../', 'public/avatars', filename)

  try {
    await fs.rename(tmpDir, avatarsDir)
    const image = path.join('avatars', filename)
    Jimp.read(avatarsDir)
      .then(file => file.resize(250, 250).write(avatarsDir))
      .catch(console.log)
    
    await User.findByIdAndUpdate(id, { avatarURL: image })
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: {
          avatarURL: image
        }
      }
    })
  } catch (error) {
    await fs.unlink(tmpDir)
    next(error)
  }
}

module.exports = updateAvatar