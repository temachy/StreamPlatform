const NodeMediaServer = require('node-media-server')
const StreamController = require('./features/streams/controllers')

const config = {
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
        ffmpeg: process.env.PORT,
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags:
                    '[hls_time=5:hls_list_size=2:hls_flags=delete_segments]',
            },
        ],
    },
}

const mediaServer = () => {
    const nms = new NodeMediaServer(config)
    const getStreamKeyFromStreamPath = (path) => {
        let parts = path.split('/')
        return parts[parts.length - 1]
    }

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
