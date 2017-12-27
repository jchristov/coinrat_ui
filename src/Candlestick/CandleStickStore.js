import {EVENT_GET_CANDLES, socket} from "../Sockets/socket"
import {extendObservable} from "mobx"

class CandleStickStore {
  constructor() {
    extendObservable(this, {
      data: null,
    })
  }

  getData(pair, market_name, interval) {
    interval = {
      since: interval.since !== null ? interval.since.toISOString() : null,
      till: interval.till !== null ? interval.till.toISOString() : null,
    }

    socket.emit(EVENT_GET_CANDLES, {
      pair: pair,
      market_name: market_name,
      interval: interval
    }, (status, data) => {
      console.log(data)
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
