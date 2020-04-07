const mongoose = require('mongoose')

const videoSchema = mongoose.Schema(
    {
        name: String,
        author: String,
        path: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Videos', videoSchema)
