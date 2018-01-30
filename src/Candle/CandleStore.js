// @flow
import {action, ObservableMap, extendObservable} from "mobx"
import {CandleSocket} from "./CandleSocket"
import {Candle} from "./Candle"
import {Interval} from "../Interval/Interval"
import {calculateAggregateHash} from "../MainChart/ChartAggregate"
import {FilterStore} from "../TopFilter/FilterStore"

class CandleStore {
  isLoading: boolean
  candles: ObservableMap<Candle>

  constructor(candlesSocket: CandleSocket) {
    this.candlesSocket = candlesSocket
    this.candles = new ObservableMap()
    this.candlesSocket.registerLastCandleEvent(this.processCandles)

    extendObservable(this, {
      isLoading: true,
    })
  }

  processCandles = action((candles: Array<Candle>): void => {
    candles.forEach((candle: Candle) => {
      const key = calculateAggregateHash(candle.date)
      this.candles.set(key, candle)
      this.isLoading = false
    })
  })

  reloadData = action((
    market: string,
    pair: string,
    interval: Interval,
    candleStorage: string,
    candleSize: string
  ): void => {
    this.isLoading = true
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
