// @flow
import {socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import CandleSocket from "./CandleSocket"
import Interval from "../Interval/Interval"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Candle from "./Candle"

class CandleStore {
  candles: ?Array<Candle> = null

  constructor(candlesSocket: CandleSocket, filterStore: FilterStore) {
    this.candlesSocket = candlesSocket
    autorun(() => {
      this.reloadData(
        filterStore.selectedMarket,
        filterStore.selectedPair,
        filterStore.selectedInterval,
        filterStore.selectedCandleStorage
      )
    })
    extendObservable(this, {candles: null})
    this.candlesSocket.registerNewCandleEvent((candle: Candle) => {
      if (this.candles !== null) {
        const candles = this.candles
        candles[candle.date.toISOString()] = candle
        this.candles = candles
      }
    })
  }

  reloadData(market: string, pair: string, interval: Interval, candleStorage: string) {
    this.candlesSocket.reloadCandles(market, pair, interval, candleStorage, (candles) => {
      this.candles = candles
    })
  }
}

const candleStoreInstance = new CandleStore(new CandleSocket(socket), filterStoreInstance)

export {
  candleStoreInstance,
  CandleStore,
}
