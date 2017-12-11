import React from "react"
import {socket, EVENT_PING_REQUEST, EVENT_PING_RESPONSE} from '../socket'

class SocketEventLogComponent extends React.Component {
  state = {log: {}}

  logMessage(message) {
    const log = this.state.log
    log[new Date().getTime()] = message
    this.setState({log: log})
  }

  componentWillMount() {
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
