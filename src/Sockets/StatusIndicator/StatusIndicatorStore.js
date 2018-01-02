// @flow
import {action, extendObservable} from "mobx"
import {AppSocket, socket} from "../socket"

class StatusIndicatorStore {
  constructor(socket: AppSocket) {
    extendObservable(this, {
      isOnline: false
    })

    socket.onConnect(action(() => this.isOnline = true))
    socket.onDisconnect(action(() => this.isOnline = false))
  }

}

const statusIndicatorStoreInstance = new StatusIndicatorStore(socket)

export {
  statusIndicatorStoreInstance,
  StatusIndicatorStore,
}
