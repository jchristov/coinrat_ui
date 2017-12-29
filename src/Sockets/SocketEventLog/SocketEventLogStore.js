import {extendObservable} from "mobx"
import {SOCKET_EVENT_PING_REQUEST, SOCKET_EVENT_PING_RESPONSE, SOCKET_EVENT_GET_CANDLES, SOCKET_EVENT_NEW_CANDLES, socket} from "../socket"

class SocketEventLogStore {
  constructor() {
    extendObservable(this, {
      log: {},
    })

    socket.on('connect', () => {
      this.logMessage('Connect')
    })
    socket.on(SOCKET_EVENT_PING_REQUEST, (data) => {
      this.logMessage(SOCKET_EVENT_PING_REQUEST + ' - ' + data['ping_id'])
    })
    socket.on(SOCKET_EVENT_PING_RESPONSE, (data) => {
      const delay = data['request_timestamp'] - data['response_timestamp']
      this.logMessage(SOCKET_EVENT_PING_RESPONSE + ' - ' + data['ping_id'] + ' (delay: ' + (Math.floor(delay * 1000) / 1000) + 's)')
    })
    socket.on(SOCKET_EVENT_GET_CANDLES, (data) => {
      this.logMessage(SOCKET_EVENT_GET_CANDLES + ' - Got ' + data.length + ' candles.')
    })
    socket.on(SOCKET_EVENT_NEW_CANDLES, (data) => {
      this.logMessage(SOCKET_EVENT_NEW_CANDLES + ' - ' + JSON.stringify(data))
    })
    socket.on('disconnect', () => {
      this.logMessage('Disconnect')
    })
  }

  logMessage(message) {
    console.log(message)
    const log = this.log
    log[new Date().getTime()] = message
    this.log = log
  }

}

const socketEventLogStore = new SocketEventLogStore()

export default socketEventLogStore
