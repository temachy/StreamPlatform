import { useState, useEffect } from 'react'
import { getVideoStream } from '../api/video'

const useVideoLink = (videoId) => {
    const [file, setFile] = useState(null)

    const handleLoad = async () => {
        const response = await getVideoStream(videoId)
        setFile(response)
    }

    useEffect(() => {
        handleLoad()
    }, [])

    return [file]
}

export default useVideoLink
