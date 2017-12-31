// @flow
import {socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import OrderSocket from "./OrderSocket"
import Order from "./Order"

class OrderStore {
  orders: ?{ [key: string]: Order } = null

  constructor(orderSocket: OrderSocket, filterStore: FilterStore) {
    this.orderSocket = orderSocket
    this.filterStore = filterStore
    autorun(() => {
      this.reloadData()
    })
    extendObservable(this, {orders: null})
    this.orderSocket.registerNewOrderEvent((order: Order) => {
      if (this.orders !== null) {
        const orders = this.orders
        orders[order.createdAt.toISOString()] = order
        this.orders = orders
      }
    })
  }

  reloadData = () => {
    this.orders = {}
    this.orderSocket.reloadOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage,
      (orders) => {
        this.orders = orders
      }
    )
  }

  clear = () => {
    this.orderSocket.clearAllOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage
    )
    this.orders = {} // Todo call this.reloadData() here but with some co-rutine/generator to make it synchronous
  }
}

const orderStoreInstance = new OrderStore(new OrderSocket(socket), filterStoreInstance)

export {
  orderStoreInstance,
  OrderStore,
}
