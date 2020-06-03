const ObjectId = require('mongodb').ObjectID

const Users = require('../../db/schemas/usersSchema')

function getUserById(id) {
    return Users.aggregate([
        {
            $match: {
                _id: ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'videos',
                localField: '_id',
                foreignField: 'author',
                as: 'videos',
            },
        },
    ])
}

function createUser(body) {
    return new Users(body).save()
}

function getAll() {
    return Users.find().lean()
}

function edit({ id, login, email, firstName, lastName, isDisabled }) {
    return Users.findOneAndUpdate(
        { _id: id },
        { login, email, firstName, lastName, isDisabled }
    )
}

module.exports = {
    getUserById,
    createUser,
    getAll,
    edit,
}
