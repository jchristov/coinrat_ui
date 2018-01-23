// @flow
import {AppSocket} from "../Sockets/socket"
import appMainToaster from "../Toaster"
import {EVENT_RUN_REPLY} from "../Sockets/SocketEvents"
import {Strategy} from "./Strategy"
import {ConfigurationDirective, ConfigurationStructure} from "../ConfigurationStructure/ConfigurationStructure"
import {Market, MOCK_MARKET_NAME} from "../Market/Market"
import {FilterStore} from "../TopFilter/FilterStore"
import {StrategyStore} from "./StrategyStore"
import {MarketStore} from "../Market/MarketStore"

class StrategyRunnerStore {
  socket: AppSocket
  filterStore: FilterStore
  strategyStoreInstance: StrategyStore

  constructor(
    socket: AppSocket,
    filterStore: FilterStore,
    strategyStoreInstance: StrategyStore,
    marketStoreInstance: MarketStore
  ) {
    this.socket = socket
    this.filterStore = filterStore
    this.strategyStoreInstance = strategyStoreInstance
    this.marketStoreInstance = marketStoreInstance
  }

  runStrategy = () => {
    if (this.filterStore.interval.since === null || this.filterStore.interval.till === null) {
      appMainToaster.show({message: "Interval must be complete.", className: 'pt-intent-danger'})
      return
    }

    const market: Market = this.marketStoreInstance.markets.get(MOCK_MARKET_NAME)
    const strategy: Strategy = this.strategyStoreInstance.strategies.get(this.filterStore.strategy)

    const strategyRunData = {
      market: market.name,
      pair: this.filterStore.pair,
      start: this.filterStore.interval.since.toISOString(),
      stop: this.filterStore.interval.till.toISOString(),
      candles_storage: this.filterStore.candleStorage,
      orders_storage: this.filterStore.orderStorage,
      strategy_name: strategy.name,
      strategy_configuration: this.serializeConfiguration(strategy.configurationStructure),
      market_configuration: this.serializeConfiguration(market.configurationStructure),
    }

    this.socket.emit(EVENT_RUN_REPLY, strategyRunData, (status, data) => {
      if (status !== 'OK') {
        console.log('Server returned ERROR: ', data['message'])
        return
      }
      appMainToaster.show({message: "Strategy started!", className: 'pt-intent-success'})
    })

  }

  serializeConfiguration = (configurationStructure: ConfigurationStructure) => {
    let result = {}
    configurationStructure.configuration.forEach((directive: ConfigurationDirective) => {
      result[directive.key] = directive.value
    })

    return result
  }
}

export {
  StrategyRunnerStore,
}
