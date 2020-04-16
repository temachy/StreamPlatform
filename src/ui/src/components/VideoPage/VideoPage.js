import React from 'react'
import { useParams } from 'react-router-dom'
import Player from './components/Player'
import MetaData from './components/MetaData'
import Comments from './components/Comments'
import useVideoLink from '../../hooks/useVideoLink'
import useVideoMeta from '../../hooks/useVideoMeta'

const VideoPage = () => {
    const params = useParams()
    const [file] = useVideoLink(params.id)
    const [videoMeta] = useVideoMeta(params.id)

    return (
        <div>
            <Player fileStream={file} />
            <MetaData video={videoMeta} />
            <Comments />
        </div>
    )
}

export default VideoPage
