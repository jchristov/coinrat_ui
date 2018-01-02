// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import SelectIntervalComponent from "../Interval/SelectIntervalComponent"
import SelectStrategyComponent from "../Strategy/SelectStrategyComponent"
import RunStrategyButtonComponent from "../Strategy/RunStrategyButtonComponent"
import CleanOrderStorageButtonComponent from "../Orders/CleanOrderStorageButtonComponent"
import SelectOrdersBackendStorageComponent from "../Orders/SelectOrdersBackendStorageComponent"
import SelectCandlesBackendStorageComponent from "../Candle/SelectCandlesBackendStorageComponent"
import {strategyRunnerStoreInstance} from "../Strategy/StrategyRunnerStore"
import {filterStoreInstance} from "./FilterStore"
import {orderStoreInstance} from "../Orders/OrderStore"
import {candleStoreInstance} from "../Candle/CandleStore"
import Interval from "../Interval/Interval"

class TopLineToolbarComponent extends Component<{}> {

  changePair = (pair: string) => {
    filterStoreInstance.changePair(pair)
    this.reloadCandleStore()
    this.reloadOrderStores()
  }

  changeMarket = (market: string) => {
    filterStoreInstance.changeMarket(market)
    this.reloadCandleStore()
    this.reloadOrderStores()
  }

  changeInterval = (interval: Interval) => {
    filterStoreInstance.changeInterval(interval)
    this.reloadCandleStore()
    this.reloadOrderStores()
  }

  changeCandleStorage = (candleStorage: string) => {
    filterStoreInstance.changeCandleStorage(candleStorage)
    this.reloadCandleStore()
  }

  changeOrderStorage = (orderStorage: string) => {
    filterStoreInstance.changeOrderStorage(orderStorage)
    this.reloadOrderStores()
  }

  reloadCandleStore = () => {
    candleStoreInstance.reloadData(
      filterStoreInstance.market,
      filterStoreInstance.pair,
      filterStoreInstance.interval,
      filterStoreInstance.candleStorage
    )
  }
  reloadOrderStores = () => {
    orderStoreInstance.reloadData(
      filterStoreInstance.market,
      filterStoreInstance.pair,
      filterStoreInstance.interval,
      filterStoreInstance.orderStorage
    )
  }

  render() {
    const markets = {
      'bittrex': {key: 'bittrex', title: 'Bittrex'},
      'bitfinex': {key: 'bitfinex', title: 'Bitfinex'},
    }

    const pairs = {
      'USD_BTC': {key: 'USD_BTC', title: 'USD-BTC'},
      'USD_LTC': {key: 'USD_LTC', title: 'USD-LTC'},
      'USD_ETH': {key: 'USD_ETH', title: 'USD-ETH'},
    }

    const candleBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    const orderBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    const strategies = {
      'double_crossover': {key: 'double_crossover', title: 'Double Crossover'}
    }

    return (
      <div>
        <div>
          <SelectPairComponent
            availablePairs={pairs}
            defaultSelectedPair={filterStoreInstance.pair}
            onSelect={this.changePair}
          />
          <SelectMarketComponent
            availableMarkets={markets}
            defaultSelectedMarket={filterStoreInstance.market}
            onSelect={this.changeMarket}
          />
          <SelectIntervalComponent
            defaultSelectedInterval={filterStoreInstance.interval}
            onChange={this.changeInterval}
          />
        </div>
        <div>
          <SelectCandlesBackendStorageComponent
            availableStorages={candleBackendStorages}
            defaultSelectedCandleStorage={filterStoreInstance.candleStorage}
            onSelect={this.changeCandleStorage}
          />
        </div>
        <div>
          <SelectOrdersBackendStorageComponent
            availableStorages={orderBackendStorages}
            defaultSelectedOrderStorage={filterStoreInstance.orderStorage}
            onSelect={this.changeOrderStorage}
          />
          <CleanOrderStorageButtonComponent onClick={orderStoreInstance.clear}/>
        </div>
        <div>
          <SelectStrategyComponent
            availableStrategies={strategies}
            defaultSelectedStrategy={filterStoreInstance.strategy}
            onSelect={filterStoreInstance.changeStrategy}
          />
          <RunStrategyButtonComponent onClick={strategyRunnerStoreInstance.runStrategy}/>
        </div>
      </div>
    )
  }
}

export default observer(TopLineToolbarComponent)
