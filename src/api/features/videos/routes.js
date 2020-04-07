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
/**
 * @swagger
 * /list:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.get('/list', controller.videoList)

router.get('/:id', controller.getVideo)
router.post('/upload', upload.single('video'), controller.uploadVideo)

module.exports = router
