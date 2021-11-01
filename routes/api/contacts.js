const express = require('express')
const { contacts: ctrl } = require('../../controllers/')
const { controllerWrapper, validation, authenticate } = require('../../middlewares/')
const { joiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.deleteById))

router.patch('/:contactId', authenticate, controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(ctrl.updateStatusContact))

module.exports = router
