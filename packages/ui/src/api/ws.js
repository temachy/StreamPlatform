import io from 'socket.io-client'

class WS {
    init() {
        this.socket = io('http://localhost:3002')
        this.socket.on('connect', function (event) {
            console.log('connected tos server')
        })
    }
    submitEvent(eventType, payload) {
        this.socket.emit(eventType, payload)
    }
}

export default new WS()
