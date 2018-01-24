// @flow

import {observer} from "mobx-react"
import StatusIndicatorComponent from "../../Sockets/StatusIndicator/StatusIndicatorComponent"
import React from "react"
import {statusIndicatorStoreInstance} from "../diContainer"

const StatusIndicatorContainer = () => {
  return <StatusIndicatorComponent isOnline={statusIndicatorStoreInstance.isOnline}/>
}

export default observer(StatusIndicatorContainer)
