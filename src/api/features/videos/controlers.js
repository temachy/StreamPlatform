const dal = require('./dal')
const fs = require('fs')
const mime = require('mime-types')
const util = require('util')
const fsStat = util.promisify(fs.stat)

async function videoList(req, res) {
    try {
        const videos = await dal.getVideosList()
        res.json(videos)
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

async function getVideoMeta(req, res) {
    try {
        const { id } = req.params
        const videos = await dal.getVideoMeta(id)

        res.json(videos[0])
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

async function getVideoFile(req, res) {
    try {
        const video = await dal.getVideo(req.params.id)
        if (!video) return res.send(404)
        const { path } = video
        const stat = await fsStat(path)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-')
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const chunksize = end - start + 1
            const file = fs.createReadStream(path, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': mime.lookup(path),
            }
            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': mime.lookup(path),
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

async function uploadVideo(req, res) {
    try {
        const { file, decoded: user } = req
        await dal.createVideo(
            file.originalname.split('.').slice(0, -1).join('.'),
            file.path,
            user._id
        )
        res.json({ message: 'File ' + file.originalname + ' was uploaded!' })
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

module.exports = {
    videoList,
    getVideoFile,
    uploadVideo,
    getVideoMeta,
}
