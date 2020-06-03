const mongoose = require('mongoose')

const streamSchema = mongoose.Schema(
    {
        name: String,
        author: mongoose.Schema.Types.ObjectId,
        path: String,
        posterPath: String,
        isLive: Boolean,
        streamKey: mongoose.Schema.Types.ObjectId,
        isDisabled: Boolean,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Streams', streamSchema)
