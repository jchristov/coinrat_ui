import {extendObservable} from "mobx"
import {EVENT_PING_REQUEST, EVENT_PING_RESPONSE, socket} from "../socket"

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
    socket.on('disconnect', () => {
      this.logMessage('Disconnect')
    })
  }


  logMessage(message) {
    this.log[new Date().getTime()] = message
  }

}

const socketEventLogStore = new SocketEventLogStore()

export default socketEventLogStore
