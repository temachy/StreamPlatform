const dal = require('./dal')

async function getUserMeta(req, res) {
    try {
        const { id } = req.params
        const user = await dal.getUserById(id)
        res.json(user)
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

async function createUser(req, res) {
    try {
        const { login, email, password, firstName, lastName } = req.body
        const user = await dal.createUser({
            login,
            email,
            password,
            firstName,
            lastName,
        })
        res.json(user)
    } catch (error) {
        console.log('error', error)
        res.status(422).send(error)
    }
}

async function allUsers(req, res) {
    try {
        const users = await dal.getAll()
        res.json(
            users.map((user) => ({
                ...user,
                isDisabled: user.isDisabled ? user.isDisabled : false,
            }))
        )
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

async function editUser(req, res) {
    try {
        const {
            login,
            email,
            password,
            firstName,
            lastName,
            isDisabled,
        } = req.body
        const { id } = req.params
        const user = await dal.edit({
            id,
            login,
            email,
            password,
            firstName,
            lastName,
            isDisabled,
        })
        res.json(user)
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

module.exports = {
    getUserMeta,
    createUser,
    allUsers,
    editUser,
}
