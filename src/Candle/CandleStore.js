// @flow
import {action, ObservableMap} from "mobx"
import {CandleSocket} from "./CandleSocket"
import {Candle} from "./Candle"
import Interval from "../Interval/Interval"
import {calculateAggregateHash} from "../MainChart/ChartAggregate"
import {FilterStore} from "../TopFilter/FilterStore"

class CandleStore {
  candles: ObservableMap<Candle>

  constructor(candlesSocket: CandleSocket) {
    this.candlesSocket = candlesSocket
    this.candles = new ObservableMap()
      this.candlesSocket.registerLastCandleEvent(this.processCandles)
  }

  processCandles = action((candles: Array<Candle>): void => {
    candles.forEach((candle: Candle) => {
      const key = calculateAggregateHash(candle.date)
      this.candles.set(key, candle)
    })
  })

  reloadData = action((
    market: string,
    pair: string,
    interval: Interval,
    candleStorage: string,
    candleSize: string
  ): void => {
    this.candles.clear()
    this.candlesSocket.reloadCandles(market, pair, interval, candleStorage, candleSize, this.processCandles)
  })

  reloadByFilter = action((filterStore: FilterStore, candleSize: string) => {
    this.reloadData(
      filterStore.market,
      filterStore.pair,
      filterStore.interval,
      filterStore.candleStorage,
      candleSize
    )
  })
}

export {
  CandleStore,
}
