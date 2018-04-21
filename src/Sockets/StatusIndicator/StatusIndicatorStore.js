// @flow
import {action, extendObservable} from "mobx"
import {AppSocket} from "../socket"

class StatusIndicatorStore {
  isOnline: boolean

  constructor(socket: AppSocket) {
    extendObservable(this, {
      isOnline: false
    })

    socket.onConnect('onlineIndicator', action(() => this.isOnline = true))
    socket.onDisconnect(action(() => this.isOnline = false))
  }

}

export {
  StatusIndicatorStore,
}
