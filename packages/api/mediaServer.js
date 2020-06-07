const NodeMediaServer = require('node-media-server')
const StreamController = require('./features/streams/controllers')

const config = (ffmpegPath) => ({
    logType: 3,
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
    },
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        ping: 30,
        ping_timeout: 60,
    },
    http: {
        port: 8888,
        mediaroot: 'media',
        allow_origin: '*',
    },

    trans: {
        ffmpeg: ffmpegPath,
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags:
                    '[hls_time=5:hls_list_size=2:hls_flags=delete_segments]',
            },
        ],
    },
})

const mediaServer = (ffmpegPath, nodeEnv) => {
    const mediaConfig = config(ffmpegPath)
    if (nodeEnv === 'production') {
        mediaConfig.https = {
            port: 8443,
            key: '/etc/letsencrypt/live/temuchik.website/privkey.pem',
            cert: '/etc/letsencrypt/live/temuchik.website/fullchain.pem;',
        }
    }
    const nms = new NodeMediaServer(mediaConfig)
    const getStreamKeyFromStreamPath = (path) => {
        let parts = path.split('/')
        return parts[parts.length - 1]
    }
    console.log('process.env.FFMPEG_PATH', process.env.FFMPEG_PATH)
    nms.run()

    nms.on('donePublish', (id, StreamPath, args) => {
        let stream_key = getStreamKeyFromStreamPath(StreamPath)
        StreamController.changeLive(stream_key, false)
    })

    nms.on('postPublish', async (id, StreamPath, args) => {
        let stream_key = getStreamKeyFromStreamPath(StreamPath)
        const stream = await StreamController.getStreamByKey(stream_key)

        if (stream) {
            console.log('stream', stream)
            await StreamController.changeLive(stream_key, true)
            return true
        }
        let session = nms.getSession(id)
        session.reject()
    })
}

module.exports = mediaServer
