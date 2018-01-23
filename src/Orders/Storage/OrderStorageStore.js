// @flow
import {OrderStorageSocket} from "./OrderStorageSocket"
import {action, extendObservable} from "mobx"
import {OrderStorageHashMap} from "./OrderStorageSocket"

class OrderStorageStore {

  orderStorages: OrderStorageHashMap
  orderStorageSocket: OrderStorageSocket

  constructor(orderStorageSocket: OrderStorageSocket) {
    this.orderStorageSocket = orderStorageSocket
    extendObservable(this, {orderStorages: {}})
  }

  reloadData = action((): void => {
    this.orderStorageSocket.loadOrderStorages(this.setOrderStorages)
  })

  setOrderStorages = action((orderStorages: OrderStorageHashMap): void => {
    this.orderStorages = orderStorages
  })
}

export {
  OrderStorageStore,
}
