import React from 'react'
import PlayerPage from '../PlayerPage'
import { useParams } from 'react-router-dom'
import useVideoLink from '../../hooks/useVideoLink'
import useVideoMeta from '../../hooks/useVideoMeta'
import Player from '../PlayerPage/components/Player'

const VideoPage = () => {
    const params = useParams()
    const [file] = useVideoLink(params.id)
    const [videoMeta] = useVideoMeta(params.id)
    return <PlayerPage file={file} videoMeta={videoMeta} player={Player} />
}

export default VideoPage
