const url = process.env.REACT_APP_BACKEND_SOCKET_URL
const socket = require('socket.io-client')(url)
// const uuidv4 = require('uuid/v4')

const SOCKET_EVENT_PING_REQUEST = 'ping_request'
const SOCKET_EVENT_PING_RESPONSE = 'ping_response'

const SOCKET_EVENT_GET_CANDLES = 'get_candles'
const SOCKET_EVENT_NEW_CANDLES = 'new_candles'

const SOCKET_EVENT_GET_ORDERS = 'get_orders'
const SOCKET_EVENT_NEW_ORDERS = 'new_orders'

const SOCKET_EVENT_SUBSCRIBE = 'subscribe'
const SOCKET_EVENT_UNSUBSCRIBE = 'unsubscribe'

const SUBSCRIBED_EVENT_NEW_CANDLE = 'new_candle'

// setTimeout(function next() {
//   socket.emit(SOCKET_EVENT_PING_REQUEST, {
//     ping_id: uuidv4(),
//     request_timestamp: (new Date()).getTime() / 1000,
//     response_timestamp: null
//   })
//   setTimeout(next, 5000)
// }, 5000)

export {
  socket,
  SOCKET_EVENT_PING_REQUEST,
  SOCKET_EVENT_PING_RESPONSE,
  SOCKET_EVENT_GET_CANDLES,
  SOCKET_EVENT_NEW_CANDLES,
  SOCKET_EVENT_GET_ORDERS,
  SOCKET_EVENT_NEW_ORDERS,
  SOCKET_EVENT_SUBSCRIBE,
  SOCKET_EVENT_UNSUBSCRIBE,
  SUBSCRIBED_EVENT_NEW_CANDLE
}
