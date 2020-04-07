import { apiRequest } from '../utils/api'

export const uploadVideo = formData =>
    apiRequest('/api/video/upload', 'POST', formData)

export const getList = () => apiRequest('/api/video/list', 'GET')
