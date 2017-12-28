import {EVENT_GET_CANDLES, EVENT_NEW_CANDLES, socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import filterStore from "../Filter/FilterStore"

class CandleStickStore {
  constructor(filterStore) {

    autorun(() => {
      this.reloadData(filterStore.selectedMarket, filterStore.selectedPair, filterStore.selectedInterval)
    })

    extendObservable(this, {
      data: null,
    })

    socket.on(EVENT_NEW_CANDLES, (candleRaw) => {
      const data = this.data

      if (data === null) {
        console.log('Ignoring (not initialized store)', candleRaw)
        return
      }

      const candle = CandleStickStore.parseOneCandleFromData(candleRaw)

      if (!this.doesCandleBelongsIntoStore(candleRaw, candle)) {
        console.log('Ignoring (mismatch)', JSON.stringify(candleRaw))
        return
      }

      data[candle.date.toISOString()] = candle
      this.data = data
    })
  }

  doesCandleBelongsIntoStore(candleRaw, candle) {
    return this.pair === candleRaw.pair
      && this.market === candleRaw.market
      && (this.interval.since === null || this.interval.since.getTime() < candle.date.getTime())
      && (this.interval.till === null || this.interval.till.getTime() > candle.date.getTime())
  }

  reloadData(market, pair, interval) {
    console.log('Reloading data... ', pair, market, interval.since, interval.till)

    socket.emit(EVENT_GET_CANDLES, {
      pair: pair,
      market_name: market,
      interval: {
        since: interval.since !== null ? interval.since.toISOString() : null,
        till: interval.till !== null ? interval.till.toISOString() : null,
      }
    }, (status, candles) => {
      this.data = CandleStickStore.parseCandlesDataIntoStateObject(candles)

      this.pair = pair
      this.market = market
      this.interval = interval
      console.log('Recieved ', Object.values(this.data).length, 'candels!')
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

const candleStickStore = new CandleStickStore(filterStore)

export default candleStickStore
