const express = require('express')
const router = express.Router()
const videos = require('../features/videos/routes')
const users = require('../features/users/routes')

router.use('/video', videos)
router.use('/users', users)

module.exports = router
