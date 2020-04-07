const Videos = require('../../db/schemas/videoSchema')

function getVideosList() {
    return Videos.find()
}

function getVideo(id) {
    return Videos.find({ _id: id })
}

function createVideo(name, path, author) {
    return Videos.create({ name, path, author })
}

module.exports = {
    getVideosList,
    getVideo,
    createVideo,
}
