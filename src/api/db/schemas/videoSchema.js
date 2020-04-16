const mongoose = require('mongoose')

const videoSchema = mongoose.Schema(
    {
        name: String,
        author: mongoose.Schema.Types.ObjectId,
        path: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Videos', videoSchema)
