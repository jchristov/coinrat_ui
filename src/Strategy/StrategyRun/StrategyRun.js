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
    if (interval.since === null) {
      throw new Error('Strategy run MUST have since time filled in interval.')
    }
    if (interval.till === null) {
      throw new Error('Strategy run MUST have till time filled in interval.')
    }
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

  getStrategyRunLengthInSeconds() {
    return this.interval.getAbsInSeconds()
  }

  getBaseCurrencyName(): string {
    return this.pair.split('_')[0]
  }

  getMarketCurrencyName(): string {
    return this.pair.split('_')[1]
  }
}

export {
  StrategyRun,
}
