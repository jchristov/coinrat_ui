import {EVENT_CANDLES, socket} from "../Sockets/socket"
import {extendObservable} from "mobx"

class CandleStickStore {
  constructor() {
    extendObservable(this, {
      data: null,
    })
  }

  getData(pair, market_name, interval) {
    socket.emit(EVENT_CANDLES, {
      pair: pair,
      market_name: market_name,
      interval: interval
    }, (status, data) => {
      this.data = data.map((candle) => {
        return {
          date: new Date(Date.parse(candle.time)),
          open: +candle.open,
          high: +candle.high,
          low: +candle.low,
          close: +candle.close,
          volume: 0,
        }
      })
    })
  }
}

const candleStickStore = new CandleStickStore()

export default candleStickStore
