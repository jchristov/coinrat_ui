// @flow
import {extendObservable} from "mobx"
import Interval from "../Interval/Interval"

class FilterStore {
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

  changeSelectedPair(pair: string) {
    this.selectedPair = pair
  }

  changeSelectedMarket(market: string) {
    this.selectedMarket = market
  }

  changeSelectedInterval(interval: Interval) {
    this.selectedInterval = interval
  }

  changeSelectedOrderStorage(orderStorage: string) {
    this.selectedOrderStorage = orderStorage
  }

  changeSelectedCandleStorage(candleStorage: string) {
    this.selectedCandleStorage = candleStorage
  }

  changeSelectedStrategy(strategy: string) {
    this.selectedStrategy = strategy
  }
}

const filterStoreInstance = new FilterStore()

export {filterStoreInstance, FilterStore}
