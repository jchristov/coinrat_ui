import {socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import filterStore from "../TopLineToolbar/FilterStore"
import CandleSocket from "./CandleSocket"

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

  reloadData(market, pair, interval, candleStorage) {
    this.candlesSocket.reloadCandles(market, pair, interval, candleStorage, (candles) => {
      this.candles = candles
    })
  }
}

const candleStore = new CandleStore(new CandleSocket(socket), filterStore)

export default candleStore
