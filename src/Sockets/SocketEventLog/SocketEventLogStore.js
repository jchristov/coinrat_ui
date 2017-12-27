import {extendObservable} from "mobx"
import {EVENT_PING_REQUEST, EVENT_PING_RESPONSE, EVENT_GET_CANDLES, EVENT_NEW_CANDLES, socket} from "../socket"

class SocketEventLogStore {
  constructor() {
    extendObservable(this, {
      log: {}
    })

    socket.on('connect', () => {
      this.logMessage('Connect')
    })
    socket.on(EVENT_PING_REQUEST, (data) => {
      this.logMessage(EVENT_PING_REQUEST + ' - ' + data['ping_id'])
    })
    socket.on(EVENT_PING_RESPONSE, (data) => {
      const delay = data['request_timestamp'] - data['response_timestamp']
      this.logMessage(EVENT_PING_RESPONSE + ' - ' + data['ping_id'] + ' (delay: ' + (Math.floor(delay * 1000) / 1000) + 's)')
    })
    socket.on(EVENT_GET_CANDLES, (data) => {
      this.logMessage(EVENT_GET_CANDLES + ' - Got ' + data.length + ' candles.')
    })
    socket.on(EVENT_NEW_CANDLES, (data) => {
      this.logMessage(EVENT_NEW_CANDLES + ' - ' + data)
    })
    socket.on('disconnect', () => {
      this.logMessage('Disconnect')
    })
  }

  logMessage(message) {
    const log = this.log
    log[new Date().getTime()] = message

    this.log = log
  }

}

const socketEventLogStore = new SocketEventLogStore()

export default socketEventLogStore
