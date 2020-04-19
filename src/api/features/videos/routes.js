const express = require('express')
const router = express.Router()
const controller = require('./controlers')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'mediaFiles'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + file.originalname)
    },
})

const upload = multer({ storage: storage })
router.get('/list', controller.videoList)

router.get('/:id', controller.getVideoFile)
router.get('/:id/meta', controller.getVideoMeta)

router.post(
    '/upload',
    upload.fields([
        { name: 'video', maxCount: 1 },
        { name: 'poster', maxCount: 1 },
    ]),
    controller.uploadVideo
)

module.exports = router
