// @flow
import {action, ObservableMap, extendObservable} from "mobx"
import {DIRECTION_BUY, DIRECTION_SELL, Order, OrderDirectionAggregate} from "./Order"
import {Interval} from "../Interval/Interval"
import type {OrdersSocket} from "./OrderSocket"
import {calculateAggregateHash} from "../MainChart/ChartAggregate"
import {minuteAggregationFunction} from "../DateAggregate/aggregatorFunctions"
import type {FilterStore} from "../TopFilter/FilterStore"

class OrderStore {
  orders: Array<Order>
  buyOrders: ObservableMap<OrderDirectionAggregate>
  sellOrders: ObservableMap<OrderDirectionAggregate>

  constructor(orderSocket: OrdersSocket) {
    this.orderSocket = orderSocket
    this.buyOrders = new ObservableMap()
    this.sellOrders = new ObservableMap()
    extendObservable(this, {
      orders: []
    })
    this.orderSocket.registerNewOrderEvent(this.processOrders)
  }

  reloadData = action((
    market: string,
    pair: string,
    interval: Interval,
    orderStorage: string,
    strategyRunId: ?string
  ): void => {
    this.buyOrders.clear()
    this.sellOrders.clear()
    this.orders = []
    this.orderSocket.reloadOrders(market, pair, interval, orderStorage, strategyRunId, this.processOrders)
  })

  reloadByFilter = action((filterStore: FilterStore) => {
    if (!filterStore.canLoadOrders()) {
      return
    }
    this.reloadData(
      filterStore.market,
      filterStore.pair,
      filterStore.interval,
      filterStore.orderStorage,
      filterStore.strategyRunId
    )
  })

  processOrders = action((orders: Array<Order>): void => {
    const buyOrders: { [key: string]: OrderDirectionAggregate } = this.buyOrders.toJS()
    const sellOrders: { [key: string]: OrderDirectionAggregate } = this.sellOrders.toJS()

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]

      this.orders.push(order)

      const date = minuteAggregationFunction(order.createdAt)
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
    this.orders = []
  })
}

export {
  OrderStore,
}
