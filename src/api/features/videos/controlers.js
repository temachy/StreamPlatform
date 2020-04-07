const dal = require('./dal')

/**
 * @swagger
 * /users:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 */
async function videoList(req, res) {
    try {
        const videos = await dal.getVideosList()
        res.json(videos)
    } catch (error) {
        res.error(error)
    }
}

async function getVideo(req, res) {
    try {
        const { id: videoId } = req.params
        const video = await dal.getVideo(videoId)
        res.json(video)
    } catch (error) {
        res.error(error)
    }
}

async function uploadVideo(req, res) {
    try {
        const { file, decoded: user } = req
        await dal.createVideo(file.filename, file.path, user._id)
        res.json({ message: 'File ' + file.originalname + ' was uploaded!' })
    } catch (error) {
        res.error(error)
    }
}

module.exports = {
    videoList,
    getVideo,
    uploadVideo,
}
