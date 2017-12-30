import {
  socket,
  SOCKET_EVENT_GET_CANDLES, SOCKET_EVENT_NEW_CANDLES, SOCKET_EVENT_SUBSCRIBE, SOCKET_EVENT_UNSUBSCRIBE,
  SUBSCRIBED_EVENT_NEW_CANDLE
} from "../Sockets/socket"

export default class CandleSocket {

  constructor(socket) {
    this.socket = socket
  }

  registerNewCandleEvent(onNewCandle) {
    this.socket.on(SOCKET_EVENT_NEW_CANDLES, (candleRaw) => {
      const candle = CandleSocket.parseOneCandleFromData(candleRaw)
      onNewCandle(candle)
    })
  }

  reloadCandles(market, pair, interval, candleStorage, onNewCandles) {
    console.log('Reloading CANDLES candles... ', pair, market, interval.since, interval.till)

    socket.emit(SOCKET_EVENT_GET_CANDLES, {
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

      const candles = CandleSocket.parseCandlesDataIntoStateObject(data)
      onNewCandles(candles)
      console.log('Received CANDLES', Object.values(candles).length, 'candles!')

      socket.emit(SOCKET_EVENT_UNSUBSCRIBE, {event: SUBSCRIBED_EVENT_NEW_CANDLE}, () => {
        socket.emit(SOCKET_EVENT_SUBSCRIBE, {
          event: SUBSCRIBED_EVENT_NEW_CANDLE,
          candle_storage: candleStorage,
          market: market,
          pair: pair,
          interval: interval,
        })
      })
    })
  }

  static parseCandlesDataIntoStateObject(candlesRaw) {
    const data = {}
    for (let i = 0; i < candlesRaw.length; i++) {
      const candleRaw = candlesRaw[i]
      const candle = CandleSocket.parseOneCandleFromData(candleRaw)
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
