// @flow
import {AppSocket, socket} from "../Sockets/socket"
import Interval from "../Interval/Interval"
import {Candle} from "./Candle"
import {
  SOCKET_EVENT_GET_CANDLES, SOCKET_EVENT_SUBSCRIBE, SOCKET_EVENT_UNSUBSCRIBE,
  SUBSCRIBED_EVENT_LAST_CANDLE_UPDATED
} from "../Sockets/SocketEvents"

type RawCandle = {
  time: string,
  open: number,
  high: number,
  low: number,
  close: number,
  size: string
}

class CandleSocket {
  constructor(socket: AppSocket) {
    this.socket = socket
  }

  reloadCandles(
    market: string,
    pair: string,
    interval: Interval,
    candleStorage: string,
    candleSize: string,
    processCandles: (candles: { [key: string]: Candle }) => void
  ) {
    const getCandlesData = {
      pair: pair,
      market: market,
      interval: interval.toIso(),
      candle_storage: candleStorage,
      candle_size: candleSize,
    }

    this.socket.emit(SOCKET_EVENT_GET_CANDLES, getCandlesData, (status: String, rawCandles: Array<RawCandle>) => {
      console.log('Received CANDLES', Object.values(rawCandles).length)
      processCandles(CandleSocket.parseCandlesDataIntoStateObject(rawCandles))

      this.socket.emit(
        SOCKET_EVENT_UNSUBSCRIBE,
        {event: SUBSCRIBED_EVENT_LAST_CANDLE_UPDATED},
        () => {
          this.socket.emit(SOCKET_EVENT_SUBSCRIBE, {
            event: SUBSCRIBED_EVENT_LAST_CANDLE_UPDATED,
            storage: candleStorage,
            market: market,
            pair: pair,
            candle_size: candleSize,
          })
        })
    })
  }

  static parseCandlesDataIntoStateObject(candlesRaw: Array<RawCandle>): Array<Candle> {
    return candlesRaw.map((rawCandle: RawCandle) => CandleSocket.parseOneCandleFromData(rawCandle))
  }

  static parseOneCandleFromData(rawCandle: RawCandle): Candle {
    const date = new Date(Date.parse(rawCandle.time))
    if (isNaN(date.getTime())) {
      console.log('ERROR: Invalid candle data: ', rawCandle)
      return null
    }

    return new Candle(date, +rawCandle.open, +rawCandle.high, +rawCandle.low, +rawCandle.close, 0, rawCandle.size)
  }
}

const candleSocketInstance: CandleSocket = new CandleSocket(socket)

export {
  CandleSocket,
  candleSocketInstance,
}
