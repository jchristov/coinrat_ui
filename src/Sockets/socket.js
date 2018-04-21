// @flow
import type {FlashMessageHandlerType} from "../FlashMessage/handling"

// const uuidv4 = require('uuid/v4')
// setTimeout(function next() {
//   socket.emit(SOCKET_EVENT_PING_REQUEST, {
//     ping_id: uuidv4(),
//     request_timestamp: (new Date()).getTime() / 1000,
//     response_timestamp: null
//   })
//   setTimeout(next, 5000)
// }, 5000)

class AppSocket {
  socketio
  onConnectListeners = {}

  constructor(socketio, flashMessageHandler: FlashMessageHandlerType) {
    this.socketio = socketio
    this.onConnect('errorHandler', () => {
      socketio.on('error', (data) => {
        flashMessageHandler(JSON.stringify(data), 'pt-intent-danger')
      })
    })
  }

  emit = (event: string, requestData: Object, onSuccess: (status: string, data: Object) => void) => {
    this.socketio.emit(event, requestData, (status: string, resultData: Object) => {
      if (status !== 'OK') {
        console.error('Server returned status:', status, 'with data:', resultData, 'for event:', event, 'data:', requestData)
        return
      }
      if (onSuccess) {
        onSuccess(status, resultData)
      }
    })
  }

  onConnect(name: string, callback: () => void) {
    this.onConnectListeners[name] = callback
    this.socketio.removeAllListeners('connect')

    for (let key in this.onConnectListeners) {
      if (this.onConnectListeners.hasOwnProperty(key)) {
        this.socketio.on('connect', this.onConnectListeners[key])
      }
    }
  }

  onDisconnect(callback: () => void) {
    this.socketio.on('disconnect', () => {
      callback()
    })
  }
}


export {
  AppSocket,
}
