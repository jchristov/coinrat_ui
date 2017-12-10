import React from "react"
import socket from '../socket'

class SocketEventLogComponent extends React.Component {
  constructor() {
    super()
    this.state = {log: []}
  }

  logMessage(message) {
    const log = {...this.state.log}
    log.push({message: message, timestamp: new Date().getTime()})
    this.setState({log})
  }

  componentWillMount() {
    socket.on('connect', () => {
      this.logMessage('Connect')
    })
    socket.on('event', (data) => {
      this.logMessage(data)
    })
    socket.on('disconnect', () => {
      this.logMessage('Connect')
    })
  }

  componentWillUnmount() {
  }

  render() {

    return <div>
      <ul>
        {this.state.log.map(function (result, index) {
          return <li><code>[{index}] {result.timestamp}: {result.message}</code></li>
        })}
      </ul>
    </div>
  }
}

export default SocketEventLogComponent
