const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const authMiddleware = require('./middlewares/authMiddleware')
const auth = require('../controllers/auth/auth')
const protectedRoutes = require('./protectedRoutes')
const users = require('../features/users/controller')
router.use(bodyParser.json({ limit: '20mb' }))
router.use(bodyParser.urlencoded({ limit: '20mb' }))

router.post('/api/login', auth.login)
router.post('/api/admin/login', auth.adminLogin)
router.post('/api/users', users.createUser)

router.use('/api', authMiddleware, protectedRoutes)

exports.router = router
