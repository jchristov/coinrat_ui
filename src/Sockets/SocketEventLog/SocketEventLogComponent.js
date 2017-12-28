import React, {Component} from 'react'
import {observer} from "mobx-react"

const SocketEventLogComponent = observer(class SocketEventLogComponent extends Component {
  render() {
    const log = this.props.store.log
    const logIds = Object.keys(log)

    console.log('refresh')

    return <div>
      <ul>
        {logIds.map((logId) => {
          return <li key={logId}><code>[{logId}] {log[logId]}</code></li>
        })}
      </ul>
    </div>
  }
})

export default SocketEventLogComponent
