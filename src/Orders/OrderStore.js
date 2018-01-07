// @flow
import {action, ObservableMap} from "mobx"
import {DIRECTION_BUY, DIRECTION_SELL, Order, OrderDirectionAggregate} from "./Order"
import {aggregateDateSecond, calculateAggregateHash} from "../DateAggregate/aggregateHash"
import Interval from "../Interval/Interval"
import {FilterStore} from "../TopLineToolbar/FilterStore"
import {orderSocketInstance, OrdersSocket} from "./OrderSocket"

class OrderStore {
  buyOrders: ObservableMap<OrderDirectionAggregate>
  sellOrders: ObservableMap<OrderDirectionAggregate>

  constructor(orderSocket: OrdersSocket) {
    this.orderSocket = orderSocket
    this.buyOrders = new ObservableMap()
    this.sellOrders = new ObservableMap()
    this.orderSocket.registerNewOrderEvent(this.processOrders)
  }

  reloadData = action((market: string, pair: string, interval: Interval, orderStorage: string): void => {
    this.buyOrders.clear()
    this.sellOrders.clear()
    this.orderSocket.reloadOrders(market, pair, interval, orderStorage, this.processOrders)
  })

  reloadByFilter = action((filterStore: FilterStore) => {
    this.reloadData(
      filterStore.market,
      filterStore.pair,
      filterStore.interval,
      filterStore.orderStorage
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

  clear = action((filterStore: FilterStore): void => {
    this.orderSocket.clearAllOrders(
      filterStore.market,
      filterStore.pair,
      filterStore.interval,
      filterStore.orderStorage
    )

    // Todo call this.reloadData() here but with some co-rutine/generator to make it synchronous
    this.buyOrders.clear()
    this.sellOrders.clear()
  })
}

const orderStoreInstance: OrderStore = new OrderStore(orderSocketInstance)

export {
  orderStoreInstance,
  OrderStore,
}
