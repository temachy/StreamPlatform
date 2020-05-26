import { apiRequest } from '../utils/api'

export const getUser = (id) => apiRequest(`/api/users/${id}`, 'GET')
export const getUsersList = () => apiRequest(`/api/users/`, 'GET')
