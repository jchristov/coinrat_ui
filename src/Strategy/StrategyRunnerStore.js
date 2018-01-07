// @flow
import {AppSocket, socket} from "../Sockets/socket"
import {filterStoreInstance, FilterStore} from "../TopLineToolbar/FilterStore"
import appMainToaster from "../Toaster"
import {EVENT_RUN_REPLY} from "../Sockets/SocketEvents"

class StrategyRunnerStore {
  constructor(socket: AppSocket, filterStore: FilterStore) {
    this.socket = socket
    this.filterStore = filterStore
  }

  runStrategy = () => {
    if (this.filterStore.interval.since === null || this.filterStore.interval.till === null) {
      appMainToaster.show({message: "Interval must be complete.", className: 'pt-intent-danger'})
      return
    }

    this.socket.emit(EVENT_RUN_REPLY, {
      market: this.filterStore.market,
      pair: this.filterStore.pair,
      start: this.filterStore.interval.since.toISOString(),
      stop: this.filterStore.interval.till.toISOString(),
      candles_storage: this.filterStore.candleStorage,
      orders_storage: this.filterStore.orderStorage,
      strategy_name: this.filterStore.strategy,
    }, (status, data) => {
      if (status !== 'OK') {
        console.log('Server returned ERROR: ', data['message'])
        return
      }
      appMainToaster.show({message: "Strategy started!", className: 'pt-intent-success'})
    })

  }
}

const strategyRunnerStoreInstance = new StrategyRunnerStore(socket, filterStoreInstance)

export {strategyRunnerStoreInstance, StrategyRunnerStore}
