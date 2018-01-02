// @flow
import {socket} from "../Sockets/socket"
import {autorun, action, ObservableMap} from "mobx"
import CandleSocket from "./CandleSocket"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {Candle, CandleAggregate} from "./Candle"
import {aggregateDateSecond, calculateAggregateHash} from "../DateAggregate/aggregateHash"

class CandleStore {
  candles: ObservableMap<CandleAggregate>

  constructor(candlesSocket: CandleSocket, filterStore: FilterStore) {
    this.filterStore = filterStore
    this.candlesSocket = candlesSocket
    this.candles = new ObservableMap()
    this.candlesSocket.registerNewCandleEvent(this.processCandles)
    autorun(() => this.reloadData())
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

  reloadData = action((): void => {
    this.candles.clear()
    this.candlesSocket.reloadCandles(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedCandleStorage,
      this.processCandles
    )
  })
}

const candleStoreInstance = new CandleStore(new CandleSocket(socket), filterStoreInstance)

export {
  candleStoreInstance,
  CandleStore,
}
