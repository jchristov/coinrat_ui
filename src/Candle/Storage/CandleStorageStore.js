// @flow
import {CandleStorageSocket} from "./CandleStorageSocket"
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

export {
  CandleStorageStore,
}
