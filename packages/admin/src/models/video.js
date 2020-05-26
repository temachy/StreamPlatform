import { getList } from '../api/video'

export const video = {
    state: {
        list: undefined,
        serverError: null,
    },
    reducers: {
        setVideo(state, payload) {
            return { ...state, ...payload }
        },
    },
    effects: dispatch => ({
        async loadVideos() {
            try {
                const response = await getList()
                dispatch.video.setVideo({ list: response.data })
                return true
            } catch (error) {
                dispatch.video.setVideo({ serverError: error })
                return false
            }
        },
    }),
}
