import React from "react"
import socket from '../socket'

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
    socket.on('event', (data) => {
      this.logMessage(data)
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
