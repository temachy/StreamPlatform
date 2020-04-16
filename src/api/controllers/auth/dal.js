const UserSchema = require('../../db/schemas/usersSchema')

function getUser(login) {
    return UserSchema.findOne({
        login: login,
    })
}

module.exports = getUser
