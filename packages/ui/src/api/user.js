import { apiRequest } from '../utils/api'
import axios from 'axios'

export const getUser = (id) => apiRequest(`/api/users/${id}`, 'GET')
export const login = ({ login, password }) =>
    axios.post(
        '/api/login',
        {
            login,
            password,
        },
        {
            'Content-type': 'application/json',
        }
    )

export const signUp = (body) =>
    axios.post('/api/users', body, {
        'Content-type': 'application/json',
    })
