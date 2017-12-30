// @flow
import {socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import filterStore from "../TopLineToolbar/FilterStore"
import CandleSocket from "./CandleSocket"
import Interval from "../Interval/Interval"

class CandleStore {
  constructor(candlesSocket, filterStore) {
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
    this.candlesSocket.registerNewCandleEvent((candle) => {
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

const candleStoreInstance = new CandleStore(new CandleSocket(socket), filterStore)

export {
  candleStoreInstance,
  CandleStore,
}
