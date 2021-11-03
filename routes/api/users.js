const express = require('express')

const { controllerWrapper, authenticate, upload } = require('../../middlewares/')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/verify')

router.patch('/avatars', upload.single('avatar'), authenticate, controllerWrapper(ctrl.updateAvatar))

module.exports = router