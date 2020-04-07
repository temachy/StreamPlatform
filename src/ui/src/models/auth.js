import jwtDecode from 'jwt-decode'
import { login as loginApi } from '../api/auth'
import history from '../utils/history'
export const auth = {
    state: {
        isLogged: false,
        user: undefined,
    },
    reducers: {
        setUser(state, payload) {
            return { ...state, ...payload }
        },
    },
    effects: dispatch => ({
        async checkAuth() {
            const user = localStorage.getItem('user')
            if (!user) {
                return dispatch.auth.setUser({ user: null, isLogged: false })
            }
            const parsed = JSON.parse(user)
            const dataExpired = new Date().getTime() > parsed.exp

            if (dataExpired) {
                localStorage.removeItem('token')
                localStorage.removeItem('user')

                return dispatch.auth.setUser({ user: null, isLogged: false })
            }
            dispatch.auth.setUser({ user: parsed, isLogged: true })
        },
        async login(payload) {
            try {
                const {
                    data: { token },
                } = await loginApi(payload)
                const parsed = jwtDecode(token)
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(parsed))
                dispatch.auth.setUser({ user: parsed, isLogged: true })
                history.push('/')
            } catch (error) {
                console.log('error', error)
                dispatch.auth.setUser({ user: null, isLogged: false })
            }
        },
    }),
}
