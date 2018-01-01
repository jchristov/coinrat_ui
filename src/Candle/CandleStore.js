// @flow
import {socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import CandleSocket from "./CandleSocket"
import {FilterStore, filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Candle from "./Candle"

class CandleStore {
  candles: ?{ [key: string]: Candle } = null

  constructor(candlesSocket: CandleSocket, filterStore: FilterStore) {
    this.filterStore = filterStore
    this.candlesSocket = candlesSocket
    extendObservable(this, {candles: null})
    this.candlesSocket.registerNewCandleEvent((candle: Candle) => {
      if (this.candles !== null) {
        const candles = this.candles
        candles[candle.date.toISOString()] = candle
        this.candles = candles
      }
    })
    autorun(() => this.reloadData())
  }

  reloadData() {
    this.candles = {}
    this.candlesSocket.reloadCandles(
      this.filterStore.selectedMarket,
      this.filterStore.selectedPair,
      this.filterStore.selectedInterval,
      this.filterStore.selectedCandleStorage,
      (candles: { [key: string]: Candle }) => {
        this.candles = candles
      })
  }
}

const candleStoreInstance = new CandleStore(new CandleSocket(socket), filterStoreInstance)

export {
  candleStoreInstance,
  CandleStore,
}
