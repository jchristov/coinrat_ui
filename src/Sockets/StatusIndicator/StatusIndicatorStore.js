// @flow
import {action, extendObservable} from "mobx"
import {AppSocket} from "../socket"

class StatusIndicatorStore {
  constructor(socket: AppSocket) {
    extendObservable(this, {
      isOnline: false
    })

    socket.onConnect(action(() => this.isOnline = true))
    socket.onDisconnect(action(() => this.isOnline = false))
  }

}

export {
  StatusIndicatorStore,
}
