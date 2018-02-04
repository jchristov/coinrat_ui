// @flow
import {extendObservable, action} from "mobx"
import {Interval} from "../Interval/Interval"

class FilterStore {
  pair: ?string
  market: ?string
  marketPlugin: string
  interval: Interval
  candleStorage: string
  orderStorage: ?string
  strategy: string
  strategyRunId: ?string

  constructor() {
    let since = new Date()
    since.setHours(since.getHours() - 12)

    extendObservable(this, {
      pair: null,
      market: null,
      marketPlugin: 'coinrat_mock',
      interval: new Interval(since),
      candleStorage: 'influx_db',
      orderStorage: null,
      strategy: 'double_crossover',
      strategyRunId: null
    })
  }

  changePair = action((pair: string) => {
    this.pair = pair
  })

  changeMarket = action((market: string) => {
    this.market = market
  })

  changeMarketPlugin = action((marketPlugin: string) => {
    this.marketPlugin = marketPlugin
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

  changeStrategyRun = action((strategyRunId: ?string) => {
    this.strategyRunId = strategyRunId
  })

  canLoadCandles = (): boolean => this.pair !== null && this.market !== null && this.candleStorage !== null

  canLoadOrders = (): boolean => this.pair !== null && this.market !== null && this.orderStorage !== null

}

export {
  FilterStore,
}
