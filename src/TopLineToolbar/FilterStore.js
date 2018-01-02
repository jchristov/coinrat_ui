// @flow
import {extendObservable, action} from "mobx"
import Interval from "../Interval/Interval"

class FilterStore {
  selectedPair: string
  selectedMarket: string
  selectedInterval: Interval
  selectedCandleStorage: string
  selectedOrderStorage: string
  selectedStrategy: string

  constructor() {
    let since = new Date()
    since.setHours(since.getHours() - 12)

    extendObservable(this, {
      selectedPair: 'USD_BTC',
      selectedMarket: 'bittrex',
      selectedInterval: new Interval(since),
      selectedCandleStorage: 'influx_db',
      selectedOrderStorage: 'influx_db',
      selectedStrategy: 'double_crossover',
    })
  }

  changeSelectedPair = action((pair: string) => {
    this.selectedPair = pair
  })

  changeSelectedMarket = action((market: string) => {
    this.selectedMarket = market
  })

  changeSelectedInterval = action((interval: Interval) => {
    this.selectedInterval = interval
  })

  changeSelectedOrderStorage = action((orderStorage: string) => {
    this.selectedOrderStorage = orderStorage
  })

  changeSelectedCandleStorage = action((candleStorage: string) => {
    this.selectedCandleStorage = candleStorage
  })

  changeSelectedStrategy = action((strategy: string) => {
    this.selectedStrategy = strategy
  })
}

const filterStoreInstance = new FilterStore()

export {
  filterStoreInstance,
  FilterStore,
}
