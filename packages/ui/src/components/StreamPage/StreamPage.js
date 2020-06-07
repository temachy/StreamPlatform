import React, { useState, useEffect } from 'react'
import PlayerPage from '../PlayerPage'
import { useParams } from 'react-router-dom'
import { getStreamDataApi } from '../../api/stream'
import StreamPlayer from './components/StreamPlayer'
const StreamPage = () => {
    const { id } = useParams()
    const [streamData, setStreamData] = useState()

    const getStreamData = async () => {
        const response = await getStreamDataApi(id)
        setStreamData(response.data)
    }
    useEffect(() => {
        getStreamData()
    }, [])
    if (!streamData) return null
    return (
        <PlayerPage
            file={`http://${process.env.REACT_APP_HOST}:8888/live/${streamData.streamKey}/index.m3u8`}
            videoMeta={streamData}
            player={StreamPlayer}
        />
    )
}

export default StreamPage
