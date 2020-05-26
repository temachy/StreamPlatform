const express = require('express')
const router = express.Router()
const videos = require('../features/videos/routes')
const users = require('../features/users/routes')
const streams = require('../features/streams/routes')

router.use('/video', videos)
router.use('/users', users)
router.use('/streams', streams)

module.exports = router
