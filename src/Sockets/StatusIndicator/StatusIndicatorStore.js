// @flow
import {socket} from "../socket"
import {extendObservable} from "mobx"

class StatusIndicatorStore {
  constructor() {
    extendObservable(this, {
      isOnline: false
    })

    socket.on('connect', () => {
      this.isOnline = true
    })
    socket.on('disconnect', () => {
      this.isOnline = false
    })
  }

}

const statusIndicatorStoreInstance = new StatusIndicatorStore()

export {
  statusIndicatorStoreInstance,
  StatusIndicatorStore
}
