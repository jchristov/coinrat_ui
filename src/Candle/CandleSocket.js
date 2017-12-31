// @flow
import {
  AppSocket,
  SOCKET_EVENT_GET_CANDLES,
  SOCKET_EVENT_NEW_CANDLES,
  SUBSCRIBED_EVENT_NEW_CANDLE,
} from "../Sockets/socket"
import Candle from "./Candle"
import Interval from "../Interval/Interval"

type RawCandle = {
  time: string,
  open: number,
  high: number,
  low: number,
  close: number,
}

class CandleSocket {

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  registerNewCandleEvent(onNewCandle: (candle: Candle) => void) {
    this.socket.socketio.on(SOCKET_EVENT_NEW_CANDLES, (candleRaw: RawCandle) => {
      const candle = CandleSocket.parseOneCandleFromData(candleRaw)
      if (candle !== null) {
        onNewCandle(candle)
      }
    })
  }

  reloadCandles(
    market: string,
    pair: string,
    interval: Interval,
    candleStorage: string,
    onNewCandles: (candles: { [key: string]: Candle }) => void
  ) {
    this.socket.emit(SOCKET_EVENT_GET_CANDLES, {
      pair: pair,
      market: market,
      interval: interval.toIso(),
      candle_storage: candleStorage
    }, (status, data) => {
      const candles = CandleSocket.parseCandlesDataIntoStateObject(data)
      onNewCandles(candles)
      console.log('Received CANDLES', Object.values(candles).length, 'candles!')
      this.socket.subscribeForUpdates(SUBSCRIBED_EVENT_NEW_CANDLE, market, pair, interval, candleStorage)
    })
  }

  static parseCandlesDataIntoStateObject(candlesRaw: Array<RawCandle>): { [key: string]: Candle } {
    const data = {}
    for (let i = 0; i < candlesRaw.length; i++) {
      const candleRaw = candlesRaw[i]
      const candle = CandleSocket.parseOneCandleFromData(candleRaw)
      if (candle !== null) {
        data[candle.date.toISOString()] = candle
      }
    }
    return data
  }

  static parseOneCandleFromData(rawCandle: RawCandle): Candle {
    const date = new Date(Date.parse(rawCandle.time))
    if (isNaN(date.getTime())) {
      console.log('ERROR: Invalid candle data: ', rawCandle)
      return null
    }

    return new Candle(date, +rawCandle.open, +rawCandle.high, +rawCandle.low, +rawCandle.close, 0)
  }
}

export default CandleSocket
