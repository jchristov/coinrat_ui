// @flow
import {
  socket,
  SOCKET_EVENT_GET_CANDLES, SOCKET_EVENT_NEW_CANDLES, SOCKET_EVENT_SUBSCRIBE, SOCKET_EVENT_UNSUBSCRIBE,
  SUBSCRIBED_EVENT_NEW_CANDLE
} from "../Sockets/socket"
import Candle from "./Candle"
import {Socket} from "socket.io-client"
import Interval from "../Interval/Interval"

type RawCandle = {
  time: string,
  open: number,
  high: number,
  low: number,
  close: number,
}

class CandleSocket {

  constructor(socket: Socket) {
    this.socket = socket
  }

  registerNewCandleEvent(onNewCandle: (candle: Candle) => void) {
    this.socket.on(SOCKET_EVENT_NEW_CANDLES, (candleRaw: RawCandle) => {
      const candle = CandleSocket.parseOneCandleFromData(candleRaw)
      if (candle !== null) {
        onNewCandle(candle)
      }
    })
  }

  reloadCandles(market: string,
                pair: string,
                interval: Interval,
                candleStorage: string,
                onNewCandles: (candles: { [key: string]: Candle }) => void) {
    console.log('Reloading CANDLES candles... ', pair, market, interval.since, interval.till)

    socket.emit(SOCKET_EVENT_GET_CANDLES, {
      pair: pair,
      market: market,
      interval: {
        since: interval.since !== null ? interval.since.toISOString() : null,
        till: interval.till !== null ? interval.till.toISOString() : null,
      },
      candle_storage: candleStorage
    }, (status, data) => {
      if (status !== 'OK') {
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
