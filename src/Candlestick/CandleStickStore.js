import {EVENT_GET_CANDLES, EVENT_NEW_CANDLES, socket} from "../Sockets/socket"
import {extendObservable} from "mobx"

class CandleStickStore {
  constructor() {
    extendObservable(this, {
      data: {},
    })

    socket.on(EVENT_NEW_CANDLES, (candleRaw) => {
      const data = this.data
      const candle = CandleStickStore.parseOneCandleFromData(candleRaw)
      data[candle.date.toISOString()] = candle
      this.data = data
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
    }, (status, candles) => {
      if (candles.length === 0) {
        return
      }
      this.data = CandleStickStore.parseCandlesDataIntoStateObject(candles)
    })
  }

  static parseCandlesDataIntoStateObject(candlesRaw) {
    const data = {}
    for (let i = 0; i < candlesRaw.length; i++) {
      const candleRaw = candlesRaw[i]
      const candle = CandleStickStore.parseOneCandleFromData(candleRaw)
      data[candle.date.toISOString()] = candle
    }
    return data
  }

  static parseOneCandleFromData(candle) {
    return {
      date: new Date(Date.parse(candle.time)),
      open: +candle.open,
      high: +candle.high,
      low: +candle.low,
      close: +candle.close,
      volume: 0,
    }
  }
}

const candleStickStore = new CandleStickStore()

export default candleStickStore
