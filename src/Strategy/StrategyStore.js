import {StrategySocket, strategySocketInstance} from "./StrategySocket"
import {action, extendObservable} from "mobx"
import {StrategyHashMap} from "./StrategySocket"

class StrategyStore {

  strategies: StrategyHashMap
  strategySocket: StrategySocket

  constructor(strategySocket: StrategySocket) {
    this.strategySocket = strategySocket
    extendObservable(this, {strategies: {}})
  }

  reloadData = action((): void => {
    this.strategySocket.loadStrategies(this.setStrategies)
  })

  setStrategies = action((strategies: StrategyHashMap): void => {
    this.strategies = strategies
  })
}

const strategyStoreInstance: StrategyStore = new StrategyStore(strategySocketInstance)

export {
  StrategyStore,
  strategyStoreInstance,
}
