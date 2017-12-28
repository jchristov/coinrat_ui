import {EVENT_GET_ORDERS, EVENT_NEW_ORDERS, socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import filterStore from "../Filter/FilterStore"

class OrdersStore {
  constructor(filterStore) {

    autorun(() => {
      this.reloadData(filterStore.selectedMarket, filterStore.selectedPair, filterStore.selectedInterval)
    })

    extendObservable(this, {
      data: null,
    })

    socket.on(EVENT_NEW_ORDERS, (orderRaw) => {
      const data = this.data

      if (data === null) {
        console.log('Ignoring ORDER (not initialized store)', orderRaw)
        return
      }

      const order = OrdersStore.parseOneCandleFromData(orderRaw)

      if (!this.doesCandleBelongsIntoStore(orderRaw, order)) {
        console.log('Ignoring ORDER (mismatch)', JSON.stringify(orderRaw))
        return
      }

      data[order.date.toISOString()] = order
      this.data = data
    })
  }

  doesCandleBelongsIntoStore(orderRaw, order) {
    return this.pair === orderRaw.pair
      && this.market === orderRaw.market
      && (this.interval.since === null || this.interval.since.getTime() < order.date.getTime())
      && (this.interval.till === null || this.interval.till.getTime() > order.date.getTime())
  }

  reloadData(market, pair, interval) {
    console.log('Reloading ORDER data... ', pair, market, interval.since, interval.till)

    socket.emit(EVENT_GET_ORDERS, {
      pair: pair,
      market_name: market,
      interval: {
        since: interval.since !== null ? interval.since.toISOString() : null,
        till: interval.till !== null ? interval.till.toISOString() : null,
      }
    }, (status, orders) => {
      this.data = OrdersStore.parseCandlesDataIntoStateObject(orders)

      this.pair = pair
      this.market = market
      this.interval = interval
      console.log('Received ORDERS', Object.values(this.data).length, 'orders!')
    })
  }

  static parseCandlesDataIntoStateObject(ordersRaw) {
    const data = {}
    for (let i = 0; i < ordersRaw.length; i++) {
      const orderRaw = ordersRaw[i]
      const order = OrdersStore.parseOneCandleFromData(orderRaw)
      data[order.date.toISOString()] = order
    }
    return data
  }

  static parseOneCandleFromData(order) {
    return {
      date: new Date(Date.parse(order.created_at)),
      value: 1,
    }
  }
}

const orderStickStore = new OrdersStore(filterStore)

export default orderStickStore
