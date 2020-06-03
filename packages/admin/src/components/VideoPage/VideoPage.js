import React, { useState, useEffect } from 'react'
import { message, Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { getVideoMeta, updateVideo } from '../../api/video'
import UploadForm from '../UploadVideo/UploadVideo'

const VideoPage = () => {
    const [video, setVideo] = useState()
    const { id } = useParams()
    const getVideo = async () => {
        try {
            const response = await getVideoMeta(id)
            setVideo(response.data)
        } catch (error) {
            message.error(error.toString())
        }
    }

    useEffect(() => {
        getVideo()
    }, [])

    const handleSubmit = async (formData) => {
        try {
            await updateVideo(id, formData)
            message.success('Video was updated!')
        } catch (error) {
            message.error(error.toString())
        }
    }
    if (!video) return <Spin />
    return <UploadForm data={video} handleSubmit={handleSubmit} />
}

export default VideoPage
