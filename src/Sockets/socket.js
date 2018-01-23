// @flow
import appMainToaster from "../Toaster"

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
  constructor(socketio) {
    this.socketio = socketio
    this.onConnect(() => {
      socketio.on('error', (data) => {
        appMainToaster.show({message: JSON.stringify(data), className: 'pt-intent-danger'})
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

  onConnect(callback: () => void) {
    this.socketio.on('connect', () => {
      callback()
    })
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
