// @flow
import {StrategyRunSocket} from "./StrategyRunSocket"
import {action, extendObservable} from "mobx"
import {StrategyRun} from "./StrategyRun"

class StrategyRunStore {
  strategyRuns: Array<StrategyRun>

  constructor(strategyRunSocket: StrategyRunSocket) {
    this.strategyRunSocket = strategyRunSocket
    extendObservable(this, {
      strategyRuns: []
    })

    this.strategyRunSocket.registerNewStrategyRunEvent(this.setStrategyRuns)
  }

  reloadData = action((onSuccess: () => void): void => {
    this.strategyRunSocket.loadStrategyRuns((strategyRuns: Array<StrategyRun>) => {
      this.setStrategyRuns(strategyRuns)
      onSuccess()
    })
  })

  setStrategyRuns = action((strategyRuns: Array<StrategyRun>): void => {
    this.strategyRuns = strategyRuns
  })
}

export {
  StrategyRunStore,
}
