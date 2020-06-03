const dal = require('./dal')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const util = require('util')
const fsStat = util.promisify(fs.stat)

async function videoList(req, res) {
    try {
        const videos = await dal.getVideosList()
        const withPath = videos.map((video) => {
            if (!video.posterPath) return video
            return {
                ...video,
                posterPath: '/' + path.basename(video.posterPath),
            }
        })
        res.json(withPath)
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
        if (!path) return res.send(404)

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
        const {
            files: { video, poster },
            body: { name },
            decoded: user,
        } = req
        await dal.createVideo(name, video[0].path, poster[0].path, user._id)
        res.json({ message: `Video ${name} was uploaded!` })
    } catch (error) {
        console.log('error', error)
        res.error(error)
    }
}

async function editVideo(req, res) {
    try {
        const {
            files: { video, poster },
            body: { name, isDisabled },
            params: { id },
        } = req
        const updateRequest = {
            id,
            name,
            isDisabled,
        }
        if (video) {
            updateRequest.videoPath = video[0].path
        }
        if (poster) {
            updateRequest.posterPath = poster[0].path
        }

        await dal.editVideo(updateRequest)
        res.json({ message: `Video ${name} was edited!` })
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
    editVideo,
}
