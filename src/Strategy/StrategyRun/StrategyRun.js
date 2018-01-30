// @flow

import {Interval} from "../../Interval/Interval"

class StrategyRun {
  strategyRunId: string
  runAt: Date
  pair: string
  markets: string
  strategyName: string
  strategyConfiguration: string
  interval: Interval
  candleStorageName: string
  orderStorageName: string

  constructor(
    strategyRunId: string,
    runAt: Date,
    pair: string,
    markets: string,
    strategyName: string,
    strategyConfiguration: string,
    interval: Interval,
    candleStorageName: string,
    orderStorageName: string
  ) {
    this.strategyRunId = strategyRunId
    this.runAt = runAt
    this.pair = pair
    this.markets = markets
    this.strategyName = strategyName
    this.strategyConfiguration = strategyConfiguration
    this.interval = interval
    this.candleStorageName = candleStorageName
    this.orderStorageName = orderStorageName
  }
}

export {
  StrategyRun,
}
