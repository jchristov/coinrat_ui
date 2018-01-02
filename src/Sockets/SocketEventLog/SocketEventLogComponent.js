// @flow
import React, {Component} from 'react'
import {inject, observer} from "mobx-react"
import {SocketEventLogStore, socketEventLogStoreInstance} from "./SocketEventLogStore"

type Props = {
  socketEventLogStoreInstance: SocketEventLogStore,
}

class SocketEventLogComponent extends Component<Props> {
  props: Props

  render() {
    const log = this.props.socketEventLogStoreInstance.log.toJS()
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
}

export default inject('socketEventLogStoreInstance')(observer(SocketEventLogComponent))
