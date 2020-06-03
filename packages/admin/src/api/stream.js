import { apiRequest } from '../utils/api'

export const updateStream = (id, formData) =>
    apiRequest(`/api/streams/${id}`, 'PUT', formData)

export const getStream = (id) => apiRequest(`/api/streams/${id}`, 'GET')

export const getList = () => apiRequest('/api/streams/', 'GET')
