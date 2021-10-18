const express = require('express')
const { contacts: ctrl } = require('../../controllers/')
const { controllerWrapper, validation } = require('../../middlewares/')
const { productSchema } = require('../../schemas/')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(productSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.deleteById))

router.patch('/:contactId', validation(productSchema), controllerWrapper(ctrl.updateById))

module.exports = router
