import { apiRequest } from '../utils/api'

export const getUser = (id) => apiRequest(`/api/users/${id}`, 'GET')
export const getUsersList = () => apiRequest(`/api/users/`, 'GET')
export const updateUser = (id, payload) =>
    apiRequest(`/api/users/${id}`, 'PUT', JSON.stringify(payload), {
        'Content-type': 'application/json',
    })
