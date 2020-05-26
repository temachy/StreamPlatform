const getUser = require('./dal')
const userService = require('../../core/users')
const jwt = require('jsonwebtoken')
const {
    jwt: { tokenKey },
} = require('../../config/keys')

async function login(req, res, next) {
    try {
        const { login, password } = req.body

        const {
            firstName,
            lastName,
            role,
            _id,
            password: userPassword,
        } = await getUser(login)

        if (!_id) {
            res.status(422).json({ message: 'Login or email aren`t valid' })
        }

        const isPasswordValid = await userService.checkUserPassword(
            password,
            userPassword
        )

        if (!isPasswordValid) {
            res.status(422).json({ message: 'Login or email aren`t valid' })
        }

        const token = jwt.sign(
            {
                exp:
                    (Math.floor(new Date().getTime() / 1000) +
                        60 * 60 * 60 * 60) *
                    1000,
                _id,
                firstName,
                lastName,
                role,
            },
            tokenKey
        )

        req.session.user = { _id, firstName, lastName, role }

        res.json({ token })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'error' })
    }
}

async function adminLogin(req, res, next) {
    try {
        const { login, password } = req.body

        const {
            firstName,
            lastName,
            role,
            _id,
            password: userPassword,
        } = await getUser(login)

        if (!_id) {
            res.status(422).json({ message: 'Login or email aren`t valid' })
        }

        if (role !== 'admin') {
            res.status(422).json({ message: 'Login or email aren`t valid' })
        }

        const isPasswordValid = await userService.checkUserPassword(
            password,
            userPassword
        )

        if (!isPasswordValid) {
            res.status(422).json({ message: 'Login or email aren`t valid' })
        }

        const token = jwt.sign(
            {
                exp: (Math.floor(new Date().getTime() / 1000) + 60 * 60) * 1000,
                _id,
                firstName,
                lastName,
                role,
            },
            tokenKey
        )

        req.session.user = { _id, firstName, lastName, role }

        res.json({ token })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'error' })
    }
}

module.exports = { login, adminLogin }
