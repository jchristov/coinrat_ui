// @flow
import {extendObservable} from "mobx"
import {AppSocket, socket} from "../socket"

class StatusIndicatorStore {
  constructor(socket: AppSocket) {
    extendObservable(this, {
      isOnline: false
    })

    socket.onConnect(() => this.isOnline = true)
    socket.onDisconnect(() => this.isOnline = false)
  }

}

const statusIndicatorStoreInstance = new StatusIndicatorStore(socket)

export {
  statusIndicatorStoreInstance,
  StatusIndicatorStore,
}
