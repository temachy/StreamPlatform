const NodeMediaServer = require('node-media-server')
const StreamController = require('./features/streams/controllers')

const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
    },
    rtmp: {
        port: 1935,
        chunk_size: 30000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
    },
    http: {
        port: 8888,
        mediaroot: 'media',
        allow_origin: '*',
    },
    trans: {
        ffmpeg: '/usr/local/Cellar/ffmpeg/4.2.2_1/bin/ffmpeg',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags:
                    '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
                mp4: true,
                mp4Flags: '[movflags=faststart]',
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

    nms.on('prePublish', async (id, StreamPath, args) => {
        let stream_key = getStreamKeyFromStreamPath(StreamPath)
        const stream = await StreamController.getStreamByKey(stream_key)

        if (stream) {
            await StreamController.changeLive(stream_key, true)
            return true
        }

        let session = nms.getSession(id)
        session.reject()
    })

    nms.on('donePublish', (id, StreamPath, args) => {
        let stream_key = getStreamKeyFromStreamPath(StreamPath)
        StreamController.changeLive(stream_key, false)
    })
    nms.run()
}

module.exports = mediaServer
