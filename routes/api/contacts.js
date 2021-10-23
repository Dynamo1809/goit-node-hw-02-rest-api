const express = require('express')
const { contacts: ctrl } = require('../../controllers/')
const { controllerWrapper, validation } = require('../../middlewares/')
const { joiSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.deleteById))

router.patch('/:contactId', controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', controllerWrapper(ctrl.updateStatusContact))

module.exports = router
