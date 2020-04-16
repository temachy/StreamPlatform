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

module.exports = {
    getUserById,
}
