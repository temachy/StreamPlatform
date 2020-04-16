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

module.exports = {
    getUserMeta,
}
