import React from "react"

class SocketEventLogComponent extends React.Component {
  render() {
    const log = this.props.store.log
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
