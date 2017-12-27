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

const statusIndicatorStore = new StatusIndicatorStore()

export default statusIndicatorStore
