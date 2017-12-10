import React from "react"
import {socket, PING_REQUEST, PING_RESPONSE} from '../socket'

class SocketEventLogComponent extends React.Component {
  constructor() {
    super()
    this.state = {log: {}}
  }

  logMessage(message) {
    const log = this.state.log
    log[new Date().getTime()] = message
    this.setState({log: log})
  }

  componentWillMount() {
    socket.on('connect', () => {
      this.logMessage('Connect')
    })
    socket.on(PING_REQUEST, (data) => {
      this.logMessage(PING_REQUEST + ' - ' + data['ping_id'])
    })
    socket.on(PING_RESPONSE, (data) => {
      const delay = data['request_timestamp'] - data['response_timestamp']
      this.logMessage(PING_RESPONSE + ' - ' + data['ping_id'] + ' (delay: ' + (Math.floor(delay * 1000) / 1000) + 's)')
    })
    socket.on('disconnect', () => {
      this.logMessage('Disconnect')
    })
  }

  componentWillUnmount() {
  }

  render() {
    const log = this.state.log
    const logIds = Object.keys(log)

    return <div>
      <ul>
        {logIds.map((logId) => {
          return <li key={logId}><code>[{logId}] {log[logId]}</code></li>
        })}
      </ul>
    </div>
  }
}

export default SocketEventLogComponent
