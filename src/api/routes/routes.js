const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const authMiddleware = require('./middlewares/authMiddleware')
const auth = require('../controllers/auth/auth')
const protectedRoutes = require('./protectedRoutes')
const users = require('../features/users/controller')
router.use(bodyParser.json({ limit: '20mb' }))
router.use(bodyParser.urlencoded({ limit: '20mb' }))

/**
 * @swagger
 *
 * /login:
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
router.post('/api/login', auth.login)
router.post('/api/admin/login', auth.adminLogin)
router.post('/api/users', users.createUser)

router.use('/api', authMiddleware, protectedRoutes)

exports.router = router
