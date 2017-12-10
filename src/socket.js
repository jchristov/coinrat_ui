const io = require('socket.io-client');
const socket = io(process.env.BACKEND_SOCKET_URL)

export default socket
