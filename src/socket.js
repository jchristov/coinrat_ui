const url = process.env.REACT_APP_BACKEND_SOCKET_URL
const socket = require('socket.io-client')(url)
const uuidv4 = require('uuid/v4')

const PING_REQUEST = 'ping_request'
const PING_RESPONSE = 'ping_response'

setTimeout(function next() {
  socket.emit(PING_REQUEST, {
    ping_id: uuidv4(),
    request_timestamp: (new Date()).getTime() / 1000,
    response_timestamp: null
  })
  setTimeout(next, 5000)
}, 5000)

export {
  socket,
  PING_REQUEST,
  PING_RESPONSE
}
