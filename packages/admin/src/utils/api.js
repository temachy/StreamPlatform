import axios from 'axios'

const apiRequest = (url, method = 'GET', body = {}, headers = {}) => {
    const token = localStorage.getItem('token')

    const options = {
        method: method,
        headers: { ...headers, authorization: 'Bearer ' + token },
        data: body,
        url,
    }
    return axios(options)
}

const getToken = () => {
    const token = localStorage.getItem('token')
    return 'Bearer ' + token
}

export { apiRequest, getToken }
