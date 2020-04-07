const express = require('express')
const router = express.Router()
const videos = require('../features/videos/routes')

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 */
router.use('/video', videos)

module.exports = router
