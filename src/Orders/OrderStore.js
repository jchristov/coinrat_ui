// @flow
import {socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import OrdersSocket from "./OrderSocket"

class OrderStore {
  constructor(ordersSocket: OrdersSocket, filterStore: FilterStore) {
    this.ordersSocket = ordersSocket
    this.filterStore = filterStore
    autorun(() => {
      this.reloadData()
    })
    extendObservable(this, {orders: null})
    this.ordersSocket.registerNewOrderEvent((order) => {
      if (this.orders !== null) {
        const orders = this.orders
        orders[order.date.toISOString()] = order
        this.orders = orders
      }
    })
  }

  reloadData() {
    this.ordersSocket.reloadOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage,
      (orders) => {
        this.orders = orders
      }
    )
  }

  clear() {
    this.orders = {}
    this.ordersSocket.clearAllOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage
    )
  }
}

const orderStoreInstance = new OrderStore(new OrdersSocket(socket), filterStoreInstance)

export {
  orderStoreInstance,
  OrderStore,
}
