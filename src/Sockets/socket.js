import Interval from "../Interval/Interval"

const url = process.env.REACT_APP_BACKEND_SOCKET_URL
const socketio = require('socket.io-client')(url)
// const uuidv4 = require('uuid/v4')

const SOCKET_EVENT_PING_REQUEST = 'ping_request'
const SOCKET_EVENT_PING_RESPONSE = 'ping_response'

const SOCKET_EVENT_GET_CANDLES = 'get_candles'
const SOCKET_EVENT_NEW_CANDLES = 'new_candles'

const SOCKET_EVENT_GET_ORDERS = 'get_orders'
const SOCKET_EVENT_NEW_ORDERS = 'new_orders'
const SOCKET_EVENT_CLEAR_ORDERS = 'clear_orders'

const SOCKET_EVENT_SUBSCRIBE = 'subscribe'
const SOCKET_EVENT_UNSUBSCRIBE = 'unsubscribe'

const SUBSCRIBED_EVENT_NEW_CANDLE = 'new_candle'
const SUBSCRIBED_EVENT_NEW_ORDER = 'new_order'

const EVENT_RUN_REPLY = 'run_reply'

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
  }

  subscribeForUpdates = (event: string, market: string, pair: string, interval: Interval, storage: string) => {
    this.socketio.emit(SOCKET_EVENT_UNSUBSCRIBE, {event: event}, () => {
      this.socketio.emit(SOCKET_EVENT_SUBSCRIBE, {
        event: event,
        storage: storage,
        market: market,
        pair: pair,
        interval: interval,
      })
    })
  }

  emit = (event: string, data: Object, onSuccess: (status: string, data: Object) => void) => {
    this.socketio.emit(event, data, (status: string, data: Object) => {
      if (status !== 'OK') {
        console.log('Server returned ERROR: ', data)
        return
      }
      onSuccess(status, data)
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

const socket = new AppSocket(socketio)

export {
  socket,
  AppSocket,

  SOCKET_EVENT_PING_REQUEST,
  SOCKET_EVENT_PING_RESPONSE,

  SOCKET_EVENT_GET_CANDLES,
  SOCKET_EVENT_NEW_CANDLES,

  SOCKET_EVENT_GET_ORDERS,
  SOCKET_EVENT_NEW_ORDERS,
  SOCKET_EVENT_CLEAR_ORDERS,

  SOCKET_EVENT_SUBSCRIBE,
  SOCKET_EVENT_UNSUBSCRIBE,

  SUBSCRIBED_EVENT_NEW_CANDLE,
  SUBSCRIBED_EVENT_NEW_ORDER,

  EVENT_RUN_REPLY,
}
