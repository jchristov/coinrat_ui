// @flow
import {AppSocket, socket} from "../Sockets/socket"
import {filterStoreInstance, FilterStore} from "../TopLineToolbar/FilterStore"
import appMainToaster from "../Toaster"
import {EVENT_RUN_REPLY} from "../Sockets/SocketEvents"
import {StrategyStore, strategyStoreInstance} from "./StrategyStore"
import {Strategy} from "./Strategy"
import {ConfigurationDirective, ConfigurationStructure} from "../ConfigurationStructure/ConfigurationStructure"

class StrategyRunnerStore {
  socket: AppSocket
  filterStore: FilterStore
  strategyStoreInstance: StrategyStore

  constructor(socket: AppSocket, filterStore: FilterStore, strategyStoreInstance: StrategyStore) {
    this.socket = socket
    this.filterStore = filterStore
    this.strategyStoreInstance = strategyStoreInstance
  }

  runStrategy = () => {
    if (this.filterStore.interval.since === null || this.filterStore.interval.till === null) {
      appMainToaster.show({message: "Interval must be complete.", className: 'pt-intent-danger'})
      return
    }

    const strategy: Strategy = this.strategyStoreInstance.strategies.get(this.filterStore.strategy)

    this.socket.emit(EVENT_RUN_REPLY, {
      market: this.filterStore.market,
      pair: this.filterStore.pair,
      start: this.filterStore.interval.since.toISOString(),
      stop: this.filterStore.interval.till.toISOString(),
      candles_storage: this.filterStore.candleStorage,
      orders_storage: this.filterStore.orderStorage,
      strategy_name: strategy.name,
      configuration: this.serializeConfiguration(strategy.configurationStructure)
    }, (status, data) => {
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

const strategyRunnerStoreInstance = new StrategyRunnerStore(socket, filterStoreInstance, strategyStoreInstance)

export {strategyRunnerStoreInstance, StrategyRunnerStore}
