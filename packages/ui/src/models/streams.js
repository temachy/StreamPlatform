import { getStreamsList } from '../api/stream'

export const streams = {
    state: {
        list: undefined,
        serverError: null,
    },
    reducers: {
        setState(state, payload) {
            return { ...state, ...payload }
        },
    },
    effects: (dispatch) => ({
        async loadStreams() {
            try {
                const response = await getStreamsList()
                dispatch.streams.setState({ list: response.data })
                return true
            } catch (error) {
                dispatch.streams.setState({ serverError: error })
                return false
            }
        },
    }),
}
