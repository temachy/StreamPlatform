const express = require('express')
const router = express.Router()
const controller = require('./controllers')
const multer = require('multer')
const path = require('path')
const permissionsMiddleware = require('../../routes/middlewares/permissionsMiddleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'mediaFiles'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        if (file.mimetype == 'video/webm') {
            return cb(null, uniqueSuffix + file.originalname + '.webm')
        }
        cb(null, uniqueSuffix + file.originalname)
    },
})

const upload = multer({ storage: storage })
router.post(
    '/',
    permissionsMiddleware(['teacher', 'admin']),
    upload.single('poster'),
    controller.create
)
router.put(
    '/:id',
    permissionsMiddleware(['teacher', 'admin']),
    upload.single('poster'),
    controller.update
)
router.get('/', controller.getAll)
router.get('/:id', controller.getStreamData)
router.delete(
    '/:id',
    permissionsMiddleware(['teacher', 'admin']),
    controller.deleteStream
)

module.exports = router
