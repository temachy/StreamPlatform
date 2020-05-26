const ObjectId = require('mongodb').ObjectID
const Streams = require('../../db/schemas/streamSchema')

const createStream = async (name, posterPath, userId) => {
    const newKey = ObjectId()
    const response = await Streams.create({
        name,
        posterPath,
        author: userId,
        isLive: false,
        streamKey: newKey,
    })
    return response
}

const getAllLive = () => {
    return Streams.find()
}

const getStream = (id) => {
    return Streams.aggregate([
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

const updateStream = (streamKey, updatePayload) => {
    return Streams.update({ streamKey }, updatePayload)
}

const getStreamByKey = (streamKey) => {
    return Streams.findOne({ streamKey })
}

const deleteStream = (id) => {
    return Streams.deleteOne({ _id: id })
}

module.exports = {
    createStream,
    getAllLive,
    getStream,
    updateStream,
    getStreamByKey,
    deleteStream,
}
