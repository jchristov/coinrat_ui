// @flow
import React from 'react'
import {observer} from "mobx-react"
import {socketEventLogStoreInstance} from "./SocketEventLogStore"

const SocketEventLogComponent = () => {
  const logData = socketEventLogStoreInstance.log.toJS()
  const logIds = Object.keys(logData)

  return <div>
    <ul>
      {logIds.map((logId) => <li key={logId}><code>[{logId}] {logData[logId]}</code></li>)}
    </ul>
  </div>
}

export default observer(SocketEventLogComponent)
