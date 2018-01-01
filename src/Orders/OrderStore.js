// @flow
import {socket} from "../Sockets/socket"
import {autorun, ObservableMap} from "mobx"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import OrderSocket from "./OrderSocket"
import {DIRECTION_BUY, DIRECTION_SELL, Order, OrderDirectionAggregate} from "./Order"

class OrderStore {
  buyOrders: ObservableMap
  sellOrders: ObservableMap

  constructor(orderSocket: OrderSocket, filterStore: FilterStore) {
    this.orderSocket = orderSocket
    this.filterStore = filterStore
    this.buyOrders = new ObservableMap()
    this.sellOrders = new ObservableMap()
    this.orderSocket.registerNewOrderEvent(this.processOrders)
    autorun(() => this.reloadData())
  }

  reloadData = () => {
    this.buyOrders.clear()
    this.sellOrders.clear()

    this.orderSocket.reloadOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage,
      this.processOrders
    )
  }

  processOrders = (orders: Array<Order>) => {
    const buyOrders = this.buyOrders.toJS()
    const sellOrders = this.sellOrders.toJS()

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      let date = order.createdAt
      date.setSeconds(0)
      let key = this.calculateAggregateHash(date)

      if (order.direction === DIRECTION_BUY) {
        if (buyOrders[key] === undefined) {
          buyOrders[key] = new OrderDirectionAggregate(date, order.direction)
        }
        buyOrders[key].increment(order.status)

      } else if (order.direction === DIRECTION_SELL) {
        if (sellOrders[key] === undefined) {
          sellOrders[key] = new OrderDirectionAggregate(date, order.direction)
        }
        sellOrders[key].increment(order.status)
      }
    }

    this.buyOrders.merge(buyOrders)
    this.sellOrders.merge(sellOrders)
  }

  calculateAggregateHash = (date: Date): string => {
    function str_pad(n) {
      return String('00' + n).slice(-2)
    }

    return `${date.getFullYear()}-${str_pad(date.getMonth() + 1)}-${str_pad(date.getDate())} `
      + `${str_pad(date.getHours())}:${str_pad(date.getMinutes())}:${str_pad(date.getSeconds())}`
  }

  clear = () => {
    this.orderSocket.clearAllOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage
    )

    // Todo call this.reloadData() here but with some co-rutine/generator to make it synchronous
    this.buyOrders.clear()
    this.sellOrders.clear()
  }
}

const orderStoreInstance = new OrderStore(new OrderSocket(socket), filterStoreInstance)

export {
  orderStoreInstance,
  OrderStore,
}
