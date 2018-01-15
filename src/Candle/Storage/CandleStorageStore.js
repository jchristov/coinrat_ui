import {CandleStorageSocket, candleStorageSocketInstance} from "./CandleStorageSocket"
import {action, extendObservable} from "mobx"
import {CandleStorageHashMap} from "./CandleStorageSocket"

class CandleStorageStore {

  candleStorages: CandleStorageHashMap
  candleStorageSocket: CandleStorageSocket

  constructor(candleStorageSocket: CandleStorageSocket) {
    this.candleStorageSocket = candleStorageSocket
    extendObservable(this, {candleStorages: {}})
  }

  reloadData = action((): void => {
    this.candleStorageSocket.loadCandleStorages(this.setCandleStorages)
  })

  setCandleStorages = action((candleStorages: CandleStorageHashMap): void => {
    this.candleStorages = candleStorages
  })
}

const candleStorageStoreInstance: CandleStorageStore = new CandleStorageStore(candleStorageSocketInstance)

export {
  CandleStorageStore,
  candleStorageStoreInstance,
}
