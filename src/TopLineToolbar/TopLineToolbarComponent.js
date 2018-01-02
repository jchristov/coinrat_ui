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
import {Box, Flex} from "reflexbox"

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

  renderPairs = () => {
    const pairs = {
      'USD_BTC': {key: 'USD_BTC', title: 'USD-BTC'},
      'USD_LTC': {key: 'USD_LTC', title: 'USD-LTC'},
      'USD_ETH': {key: 'USD_ETH', title: 'USD-ETH'},
    }

    return <SelectPairComponent
      availablePairs={pairs}
      defaultSelectedPair={filterStoreInstance.pair}
      onSelect={this.changePair}
    />
  }

  renderMarkets = () => {
    const markets = {
      'bittrex': {key: 'bittrex', title: 'Bittrex'},
      'bitfinex': {key: 'bitfinex', title: 'Bitfinex'},
    }

    return <SelectMarketComponent
      availableMarkets={markets}
      defaultSelectedMarket={filterStoreInstance.market}
      onSelect={this.changeMarket}
    />
  }

  renderInterval = () => {
    return <SelectIntervalComponent
      defaultSelectedInterval={filterStoreInstance.interval}
      onChange={this.changeInterval}
    />
  }

  renderCandleStorages = () => {
    const candleBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    return <SelectCandlesBackendStorageComponent
      availableStorages={candleBackendStorages}
      defaultSelectedCandleStorage={filterStoreInstance.candleStorage}
      onSelect={this.changeCandleStorage}
    />
  }

  f
  renderOrderStorages = () => {
    const orderBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    return <SelectOrdersBackendStorageComponent
      availableStorages={orderBackendStorages}
      defaultSelectedOrderStorage={filterStoreInstance.orderStorage}
      onSelect={this.changeOrderStorage}
    />
  }

  renderStrategies = () => {
    const strategies = {
      'double_crossover': {key: 'double_crossover', title: 'Double Crossover'}
    }

    return <SelectStrategyComponent
      availableStrategies={strategies}
      defaultSelectedStrategy={filterStoreInstance.strategy}
      onSelect={filterStoreInstance.changeStrategy}
    />
  }

  render() {
    return <div>
      <Flex alignItems="start">
        <Box>
          <Flex column>
            <Box>{this.renderPairs()}</Box>
            <Box>{this.renderMarkets()}</Box>
          </Flex>
        </Box>
        <Box>
          <Flex column>
            <Box>{this.renderCandleStorages()}</Box>
            <Box>
              <Flex>
                <Box>{this.renderOrderStorages()}</Box>
                <Box><CleanOrderStorageButtonComponent onClick={orderStoreInstance.clear}/></Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex column>
            <Box>{this.renderInterval()}</Box>
            <Box>
              <Flex>
                <Box>{this.renderStrategies()}</Box>
                <Box><RunStrategyButtonComponent onClick={strategyRunnerStoreInstance.runStrategy}/></Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  }
}

export default observer(TopLineToolbarComponent)
