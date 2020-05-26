import { apiRequest, getToken } from '../utils/api'

export const uploadVideo = (formData) =>
    apiRequest('/api/video/upload', 'POST', formData)

export const getVideoStream = (videoId) => {
    const options = {
        headers: {
            Authorization: getToken(),
        },
    }

    return fetch(`/api/video/${videoId}`, options)
        .then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
}

export const getVideoMeta = (id) => apiRequest(`/api/video/${id}/meta`, 'GET')

export const getList = () => apiRequest('/api/video/list', 'GET')
