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

module.exports = {
    getUserById,
    createUser,
}
