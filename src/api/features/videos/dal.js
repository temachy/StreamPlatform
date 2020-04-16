const ObjectId = require('mongodb').ObjectID
const Videos = require('../../db/schemas/videoSchema')

function getVideosList() {
    return Videos.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: {
                path: '$user',
            },
        },
    ])
}

function getVideoMeta(id) {
    return Videos.aggregate([
        {
            $match: {
                _id: ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: {
                path: '$user',
            },
        },
    ])
}

function getVideo(id) {
    return Videos.findOne({ _id: id })
}

function createVideo(name, path, author) {
    return Videos.create({ name, path, author: ObjectId(author) })
}

module.exports = {
    getVideosList,
    getVideo,
    createVideo,
    getVideoMeta,
}
