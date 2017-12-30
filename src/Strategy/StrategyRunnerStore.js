import {EVENT_RUN_REPLY, socket} from "../Sockets/socket"
import filterStore from "../TopLineToolbar/FilterStore"
import appMainToaster from "../Toaster"

class StrategyRunnerStore {
  constructor(socket, filterStore) {
    this.socket = socket
    this.filterStore = filterStore
  }

  runStrategy = () => {
    if (this.filterStore.selectedInterval.since === null || this.filterStore.selectedInterval.till === null) {
      appMainToaster.show({message: "Interval must be complete.", className: 'pt-intent-danger'})
      return
    }

    this.socket.emit(EVENT_RUN_REPLY, {
      market: this.filterStore.selectedMarket,
      pair: this.filterStore.selectedPair,
      start: this.filterStore.selectedInterval.since.toISOString(),
      stop: this.filterStore.selectedInterval.till.toISOString(),
      candles_storage: this.filterStore.selectedCandleStorage,
      orders_storage: this.filterStore.selectedOrderStorage,
      strategy_name: this.filterStore.selectedStrategy,
    }, (status, data) => {
      if (status !== 'OK') {
        console.log('Server returned ERROR: ', data['message'])
        return
      }
      appMainToaster.show({message: "Strategy started!", className: 'pt-intent-success'})
    })

  }
}

const strategyRunnerStore = new StrategyRunnerStore(socket, filterStore)

export default strategyRunnerStore
