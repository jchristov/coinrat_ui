// @flow
import {
  socket,
  SOCKET_EVENT_PING_REQUEST,
  SOCKET_EVENT_PING_RESPONSE,
  SOCKET_EVENT_NEW_CANDLES,
  SOCKET_EVENT_NEW_ORDERS,
} from "../socket"
import {action, ObservableMap} from "mobx"

class SocketEventLogStore {
  log: ObservableMap<string>

  constructor() {
    this.log = new ObservableMap()

    socket.socketio.on('connect', () => {
      this.logMessage('Connect')
    })
    socket.socketio.on(SOCKET_EVENT_PING_REQUEST, (data) => {
      this.logMessage(SOCKET_EVENT_PING_REQUEST + ' - ' + data['ping_id'])
    })
    socket.socketio.on(SOCKET_EVENT_PING_RESPONSE, (data) => {
      const delay = data['request_timestamp'] - data['response_timestamp']
      this.logMessage(SOCKET_EVENT_PING_RESPONSE + ' - ' + data['ping_id'] + ' (delay: ' + (Math.floor(delay * 1000) / 1000) + 's)')
    })
    socket.socketio.on(SOCKET_EVENT_NEW_CANDLES, (data) => {
      this.logMessage(SOCKET_EVENT_NEW_CANDLES + ' - ' + JSON.stringify(data))
    })
    socket.socketio.on(SOCKET_EVENT_NEW_ORDERS, (data) => {
      this.logMessage(SOCKET_EVENT_NEW_ORDERS + ' - ' + JSON.stringify(data))
    })
    socket.socketio.on('disconnect', () => {
      this.logMessage('Disconnect')
    })
  }

  logMessage = action((message) => {
    console.log(message)
    this.log.set(new Date().getTime(), message)
  })
}

const socketEventLogStoreInstance = new SocketEventLogStore()

export {
  socketEventLogStoreInstance,
  SocketEventLogStore,
}
