import axios from 'axios'

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

export const logout = () => axios.post('/api/logout')
