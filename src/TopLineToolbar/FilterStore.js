// @flow
import {extendObservable, action} from "mobx"
import Interval from "../Interval/Interval"

class FilterStore {
  pair: string
  market: string
  interval: Interval
  candleStorage: string
  orderStorage: string
  strategy: string

  constructor() {
    let since = new Date()
    since.setHours(since.getHours() - 12)

    extendObservable(this, {
      pair: 'USD_BTC',
      market: 'bittrex',
      interval: new Interval(since),
      candleStorage: 'influx_db',
      orderStorage: 'influx_db',
      strategy: 'double_crossover',
    })
  }

  changePair = action((pair: string) => {
    this.pair = pair
  })

  changeMarket = action((market: string) => {
    this.market = market
  })

  changeInterval = action((interval: Interval) => {
    this.interval = interval
  })

  changeOrderStorage = action((orderStorage: string) => {
    this.orderStorage = orderStorage
  })

  changeCandleStorage = action((candleStorage: string) => {
    this.candleStorage = candleStorage
  })

  changeStrategy = action((strategy: string) => {
    this.strategy = strategy
  })
}

const filterStoreInstance: FilterStore = new FilterStore()

export {
  filterStoreInstance,
  FilterStore,
}
