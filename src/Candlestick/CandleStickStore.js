import {EVENT_GET_CANDLES, EVENT_NEW_CANDLES, socket} from "../Sockets/socket"
import {autorun, extendObservable} from "mobx"
import filterStore from "../Filter/FilterStore"

class CandleStickStore {
  constructor(filterStore) {
    this.filterStore = filterStore

    autorun(() => {
      this.reloadData(
        filterStore.selectedMarket,
        filterStore.selectedPair,
        filterStore.selectedInterval,
        filterStore.selectedCandleStorage
      )
    })

    extendObservable(this, {
      data: null,
    })

    socket.on(EVENT_NEW_CANDLES, (candleRaw) => {
      const data = this.data

      if (data === null) {
        console.log('Ignoring CANDLE (not initialized store)', candleRaw)
        return
      }

      const candle = CandleStickStore.parseOneCandleFromData(candleRaw)

      if (!this.doesCandleBelongsIntoStore(candleRaw, candle)) {
        console.log('Ignoring CANDLE (mismatch)', JSON.stringify(candleRaw))
        return
      }

      data[candle.date.toISOString()] = candle
      this.data = data
    })
  }

  doesCandleBelongsIntoStore(candleRaw, candle) {
    return this.filterStore.selectedPair === candleRaw.pair
      && this.filterStore.selectedMarket === candleRaw.market
      && (this.filterStore.selectedInterval.since === null || this.filterStore.selectedInterval.since.getTime() <= candle.date.getTime())
      && (this.filterStore.selectedInterval.till === null || this.filterStore.selectedInterval.till.getTime() >= candle.date.getTime())
  }

  reloadData(market, pair, interval, candleStorage) {
    console.log('Reloading CANDLES data... ', pair, market, interval.since, interval.till)

    socket.emit(EVENT_GET_CANDLES, {
      pair: pair,
      market_name: market,
      interval: {
        since: interval.since !== null ? interval.since.toISOString() : null,
        till: interval.till !== null ? interval.till.toISOString() : null,
      },
      candles_storage: candleStorage
    }, (status, data) => {
      if (status === 'ERROR') {
        console.log('Server returned ERROR: ', data['message'])
        return
      }

      this.data = CandleStickStore.parseCandlesDataIntoStateObject(data)
      console.log('Received CANDLES', Object.values(this.data).length, 'candles!')
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
