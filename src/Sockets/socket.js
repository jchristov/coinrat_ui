const url = process.env.REACT_APP_BACKEND_SOCKET_URL
const socket = require('socket.io-client')(url)
// const uuidv4 = require('uuid/v4')

const EVENT_PING_REQUEST = 'ping_request'
const EVENT_PING_RESPONSE = 'ping_response'
const EVENT_GET_CANDLES = 'get_candles'
const EVENT_NEW_CANDLES = 'new_candles'

// setTimeout(function next() {
//   socket.emit(EVENT_PING_REQUEST, {
//     ping_id: uuidv4(),
//     request_timestamp: (new Date()).getTime() / 1000,
//     response_timestamp: null
//   })
//   setTimeout(next, 5000)
// }, 5000)

export {
  socket,
  EVENT_PING_REQUEST,
  EVENT_PING_RESPONSE,
  EVENT_GET_CANDLES,
  EVENT_NEW_CANDLES
}
