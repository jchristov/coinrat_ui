// @flow
import {action, ObservableMap} from "mobx"
import {CandleSocket, candleSocketInstance} from "./CandleSocket"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {Candle, CandleAggregate} from "./Candle"
import {aggregateDateSecond, calculateAggregateHash} from "../DateAggregate/aggregateHash"
import Interval from "../Interval/Interval"

class CandleStore {
  candles: ObservableMap<CandleAggregate>

  constructor(candlesSocket: CandleSocket) {
    this.candlesSocket = candlesSocket
    this.candles = new ObservableMap()
  }

  processCandles = action((candles: Array<Candle>): void => {
    const candlesAggregates: { [key: string]: CandleAggregate } = this.candles.toJS()

    for (let i = 0; i < candles.length; i++) {
      const candle = candles[i]
      const date = aggregateDateSecond(candle.date)
      const key = calculateAggregateHash(date)

      if (candlesAggregates[key] === undefined) {
        candlesAggregates[key] = new CandleAggregate(date)
      }
      candlesAggregates[key].addCandle(candle)
    }

    this.candles.merge(candlesAggregates)
  })

  reloadData = action((market: string, pair: string, interval: Interval, candleStorage: string): void => {
    this.candles.clear()
    this.candlesSocket.reloadCandles(market, pair, interval, candleStorage, this.processCandles)
  })

  reloadByFilter = action((filterStore: FilterStore) => {
    this.reloadData(
      filterStore.market,
      filterStore.pair,
      filterStore.interval,
      filterStore.candleStorage
    )
  })
}

const candleStoreInstance: CandleStore = new CandleStore(candleSocketInstance, filterStoreInstance)

export {
  candleStoreInstance,
  CandleStore,
}
