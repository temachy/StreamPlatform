import { apiRequest } from '../utils/api'

export const getUser = (id) => apiRequest(`/api/users/${id}`, 'GET')
