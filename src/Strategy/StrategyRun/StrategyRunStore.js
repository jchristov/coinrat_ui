// @flow
import {StrategyRunSocket} from "./StrategyRunSocket"
import {action, ObservableMap} from "mobx"
import {StrategyRun} from "./StrategyRun"

class StrategyRunStore {
  strategyRuns: ObservableMap<StrategyRun>

  constructor(strategyRunSocket: StrategyRunSocket) {
    this.strategyRunSocket = strategyRunSocket
    this.strategyRuns = new ObservableMap()
    this.strategyRunSocket.registerNewStrategyRunEvent(this.processStrategyRuns)
  }

  reloadData = action((onSuccess: () => void): void => {
    this.strategyRunSocket.loadStrategyRuns((strategyRuns: Array<StrategyRun>) => {
      this.processStrategyRuns(strategyRuns)
      onSuccess()
    })
  })

  processStrategyRuns = action((strategyRuns: Array<StrategyRun>): void => {
    strategyRuns.forEach((strategyRun: StrategyRun) => {
      this.strategyRuns.set(strategyRun.strategyRunId, strategyRun)
    })
  })
}

export {
  StrategyRunStore,
}
