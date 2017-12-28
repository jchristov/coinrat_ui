import {EVENT_GET_CANDLES, EVENT_NEW_CANDLES, socket} from "../Sockets/socket"
import {extendObservable} from "mobx"

class CandleStickStore {
  constructor() {

    let since = new Date()
    since.setHours(since.getHours() - 2)

    extendObservable(this, {
      data: null,
      selectedPair: 'USD_BTC',
      selectedMarket: 'bittrex',
      selectedInterval: {since: since, till: null}
    })

    socket.on(EVENT_NEW_CANDLES, (candleRaw) => {
      if (candleRaw.pair !== this.selectedPair) {
        console.log('Ignoring candle of pair', candleRaw.pair, ', pair mismatch')
        return
      }

      const data = this.data
      const candle = CandleStickStore.parseOneCandleFromData(candleRaw)
      data[candle.date.toISOString()] = candle
      this.data = data
    })

    this.reloadData()
  }

  changeSelectedPair(pair) {
    this.selectedPair = pair
    this.reloadData()
  }

  changeSelectedMarket(market) {
    this.selectedMarket = market
    this.reloadData()
  }

  reloadData() {
    console.log('Reloading data... ', this.selectedPair, this.selectedMarket, this.selectedInterval.since, this.selectedInterval.till)
    const interval = {
      since: this.selectedInterval.since !== null ? this.selectedInterval.since.toISOString() : null,
      till: this.selectedInterval.till !== null ? this.selectedInterval.till.toISOString() : null,
    }

    socket.emit(EVENT_GET_CANDLES, {
      pair: this.selectedPair,
      market_name: this.selectedMarket,
      interval: interval
    }, (status, candles) => {
      this.data = CandleStickStore.parseCandlesDataIntoStateObject(candles)
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

const candleStickStore = new CandleStickStore()

export default candleStickStore
