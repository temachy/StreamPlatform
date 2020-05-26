import { apiRequest } from '../utils/api'

export const createStream = (formData) =>
    apiRequest('/api/streams', 'POST', formData)

export const getStreamDataApi = (streamId) =>
    apiRequest(`/api/streams/${streamId}`, 'GET')

export const getStreamsList = () => apiRequest('/api/streams', 'GET')

export const deleteStream = (streamId) =>
    apiRequest(`/api/streams/${streamId}`, 'DELETE')
