import { useEffect, useState } from 'react'
import { getVideoMeta as getVideoMeteApi } from '../api/video'
const useVideoMeta = (id) => {
    const [videoMeta, setVideoMeta] = useState()

    const getVideoMeta = async () => {
        const response = await getVideoMeteApi(id)
        setVideoMeta(response.data)
    }
    useEffect(() => {
        getVideoMeta(id)
    }, [])

    return [videoMeta]
}

export default useVideoMeta
