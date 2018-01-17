// @flow
import {AppSocket, socket} from "../socket"
import {action, ObservableMap} from "mobx"
import {SOCKET_EVENT_NEW_CANDLES, SOCKET_EVENT_NEW_ORDERS, SOCKET_EVENT_PING_RESPONSE} from "../SocketEvents"

class SocketEventLogStore {
  log: ObservableMap<string>

  constructor(socket: AppSocket) {
    this.log = new ObservableMap()
    this.socket = socket

    this.socket.socketio.on('connect', () => {
      this.logMessage('Connect')
    })
    this.socket.socketio.on(SOCKET_EVENT_PING_RESPONSE, (data) => {
      const delay = data['request_timestamp'] - data['response_timestamp']
      this.logMessage(SOCKET_EVENT_PING_RESPONSE + ' - ' + data['ping_id'] + ' (delay: ' + (Math.floor(delay * 1000) / 1000) + 's)')
    })
    this.socket.socketio.on(SOCKET_EVENT_NEW_CANDLES, (data) => {
      this.logMessage(SOCKET_EVENT_NEW_CANDLES + ' - ' + JSON.stringify(data))
    })
    this.socket.socketio.on(SOCKET_EVENT_NEW_ORDERS, (data) => {
      this.logMessage(SOCKET_EVENT_NEW_ORDERS + ' - ' + JSON.stringify(data))
    })
    this.socket.socketio.on('disconnect', () => {
      this.logMessage('Disconnect')
    })
  }

  logMessage = action((message) => {
    // console.log(message)
    this.log.set(new Date().getTime(), message)
  })
}

const socketEventLogStoreInstance: SocketEventLogStore = new SocketEventLogStore(socket)

export {
  socketEventLogStoreInstance,
  SocketEventLogStore,
}
