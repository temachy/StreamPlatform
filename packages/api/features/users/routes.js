const express = require('express')
const router = express.Router()
const controller = require('./controller')
const permissionsMiddleware = require('../../routes/middlewares/permissionsMiddleware')
router.get('/:id', controller.getUserMeta)
router.get('/', permissionsMiddleware(['admin']), controller.allUsers)
router.put('/:id', permissionsMiddleware(['admin']), controller.editUser)

module.exports = router
