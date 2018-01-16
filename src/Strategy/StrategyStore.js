import {StrategySocket, strategySocketInstance} from "./StrategySocket"
import {action, ObservableMap} from "mobx"
import {Strategy} from "./Strategy"

class StrategyStore {

  strategies: ObservableMap<Strategy>
  strategySocket: StrategySocket

  constructor(strategySocket: StrategySocket) {
    this.strategySocket = strategySocket
    this.strategies = new ObservableMap()
  }

  reloadData = action((): void => {
    this.strategySocket.loadStrategies(this.setStrategies)
  })

  setStrategies = action((strategies: Array<Strategy>): void => {
    this.strategies.clear()
    strategies.forEach((strategy: Strategy) => {
      this.strategies.set(strategy.name, strategy)
    })
  })
}

const strategyStoreInstance: StrategyStore = new StrategyStore(strategySocketInstance)

export {
  StrategyStore,
  strategyStoreInstance,
}
