// @flow
import {socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import OrderSocket from "./OrderSocket"
import {DIRECTION_BUY, DIRECTION_SELL, Order, OrderDirectionAggregate} from "./Order"

class OrderStore {
  buyOrders: ?{ [key: string]: OrderDirectionAggregate } = null
  sellOrders: ?{ [key: string]: OrderDirectionAggregate } = null

  constructor(orderSocket: OrderSocket, filterStore: FilterStore) {
    this.orderSocket = orderSocket
    this.filterStore = filterStore
    autorun(() => {
      this.reloadData()
    })
    extendObservable(this, {
      buyOrders: null,
      sellOrders: null,
    })
    this.orderSocket.registerNewOrderEvent(this.addOrder)
  }

  reloadData = () => {
    this.buyOrders = {}
    this.sellOrders = {}

    this.orderSocket.reloadOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage,
      this.addOrder
    )
  }

  addOrder = (order: Order) => {
    if (order.direction === DIRECTION_BUY) {
      this.buyOrders = this.addOrderIntoAggregate(this.buyOrders, order)
    } else if (order.direction === DIRECTION_SELL) {
      this.sellOrders = this.addOrderIntoAggregate(this.sellOrders, order)
    }
  }

  addOrderIntoAggregate = (aggregateMap: { [key: string]: OrderDirectionAggregate }, order: Order) => {
    const key = this.calculateAggregateHash(order)
    if (aggregateMap[key] === undefined) {
      aggregateMap[key] = new OrderDirectionAggregate(order.direction)
    }
    aggregateMap[key].increment()
    return aggregateMap
  }

  calculateAggregateHash = (order: Order): string => {
    const date = order.createdAt
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
  }

  clear = () => {
    this.orderSocket.clearAllOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage
    )

    // Todo call this.reloadData() here but with some co-rutine/generator to make it synchronous
    this.buyOrders = {}
    this.sellOrders = {}
  }
}

const orderStoreInstance = new OrderStore(new OrderSocket(socket), filterStoreInstance)

export {
  orderStoreInstance,
  OrderStore,
}
