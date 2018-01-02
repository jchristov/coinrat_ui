// @flow
import {socket} from "../Sockets/socket"
import {autorun, action, ObservableMap} from "mobx"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import OrderSocket from "./OrderSocket"
import {DIRECTION_BUY, DIRECTION_SELL, Order, OrderDirectionAggregate} from "./Order"
import {aggregateDateSecond, calculateAggregateHash} from "../DateAggregate/aggregateHash"

class OrderStore {
  buyOrders: ObservableMap<OrderDirectionAggregate>
  sellOrders: ObservableMap<OrderDirectionAggregate>

  constructor(orderSocket: OrderSocket, filterStore: FilterStore) {
    this.orderSocket = orderSocket
    this.filterStore = filterStore
    this.buyOrders = new ObservableMap()
    this.sellOrders = new ObservableMap()
    this.orderSocket.registerNewOrderEvent(this.processOrders)
    autorun(() => this.reloadData())
  }

  reloadData = action((): void => {
    this.buyOrders.clear()
    this.sellOrders.clear()

    this.orderSocket.reloadOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage,
      this.processOrders
    )
  })

  processOrders = action((orders: Array<Order>): void => {
    const buyOrders: { [key: string]: OrderDirectionAggregate } = this.buyOrders.toJS()
    const sellOrders: { [key: string]: OrderDirectionAggregate } = this.sellOrders.toJS()

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      const date = aggregateDateSecond(order.createdAt)
      const key = calculateAggregateHash(date)

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
  })

  clear = action((): void => {
    this.orderSocket.clearAllOrders(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedOrderStorage
    )

    // Todo call this.reloadData() here but with some co-rutine/generator to make it synchronous
    this.buyOrders.clear()
    this.sellOrders.clear()
  })
}

const orderStoreInstance = new OrderStore(new OrderSocket(socket), filterStoreInstance)

export {
  orderStoreInstance,
  OrderStore,
}
