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

export default class CandleSocket {

  constructor(socket: Socket) {
    this.socket = socket
  }

  registerNewCandleEvent(onNewCandle: (candle: Candle) => void) {
    this.socket.on(SOCKET_EVENT_NEW_CANDLES, (candleRaw: RawCandle) => {
      const candle = CandleSocket.parseOneCandleFromData(candleRaw)
      onNewCandle(candle)
    })
  }

  reloadCandles(
    market: string,
    pair: string,
    interval: Interval,
    candleStorage: string,
    onNewCandles: (candles: Array<Candle>) => void
  ) {
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

  static parseCandlesDataIntoStateObject(candlesRaw) {
    const data = {}
    for (let i = 0; i < candlesRaw.length; i++) {
      const candleRaw = candlesRaw[i]
      const candle = CandleSocket.parseOneCandleFromData(candleRaw)
      data[candle.date.toISOString()] = candle
    }
    return data
  }

  static parseOneCandleFromData(candle: RawCandle): Candle {
    return new Candle(
      new Date(Date.parse(candle.time)),
      +candle.open,
      +candle.high,
      +candle.low,
      +candle.close,
      0,
    )
  }
}
