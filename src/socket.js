const io = require('socket.io-client');

const url = process.env.REACT_APP_BACKEND_SOCKET_URL
console.log(url)

const socket = io(url)

export default socket
