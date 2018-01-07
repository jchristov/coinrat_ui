// @flow
import {AppSocket, socket} from "../Sockets/socket"
import Interval from "../Interval/Interval"
import {Candle} from "./Candle"
import {SOCKET_EVENT_GET_CANDLES, SUBSCRIBED_EVENT_NEW_CANDLE} from "../Sockets/SocketEvents"

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

  reloadCandles(
    market: string,
    pair: string,
    interval: Interval,
    candleStorage: string,
    processCandles: (candles: { [key: string]: Candle }) => void
  ) {
    this.socket.emit(SOCKET_EVENT_GET_CANDLES, {
      pair: pair,
      market: market,
      interval: interval.toIso(),
      candle_storage: candleStorage
    }, (status: String, rawCandles: Array<RawCandle>) => {
      console.log('Received CANDLES', Object.values(rawCandles).length, 'candles!')
      processCandles(CandleSocket.parseCandlesDataIntoStateObject(rawCandles))
      this.socket.subscribeForUpdates(SUBSCRIBED_EVENT_NEW_CANDLE, market, pair, interval, candleStorage)
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

    return new Candle(date, +rawCandle.open, +rawCandle.high, +rawCandle.low, +rawCandle.close, 0)
  }
}

const candleSocketInstance: CandleSocket = new CandleSocket(socket)

export {
  CandleSocket,
  candleSocketInstance,
}
