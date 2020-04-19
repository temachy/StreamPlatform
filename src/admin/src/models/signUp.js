import jwtDecode from 'jwt-decode'
import { login as loginApi, logout as logoutApi } from '../api/auth'
import history from '../utils/history'

const initState = {
    loading: null,
    isCreated: null,
}

export const signUp = {
    state: initState,
    reducers: {
        setState(state, payload) {
            return { ...state, ...payload }
        },
        clearState() {
            return initState
        },
    },
    effects: (dispatch) => ({
        async signUp(payload) {
            dispatch.signUp.setState({
                loading: true,
            })

            console.log('payload', payload)

            dispatch.signUp.setState({
                loading: false,
                isCreated: true,
            })

            return true
        },
    }),
}
