// @flow
import {AppSocket, socket} from "../Sockets/socket"
import Interval from "../Interval/Interval"
import {Candle} from "./Candle"
import {
  SOCKET_EVENT_GET_CANDLES,
  SOCKET_EVENT_LAST_CANDLE_UPDATED,
  SOCKET_EVENT_SUBSCRIBE,
  SOCKET_EVENT_UNSUBSCRIBE,
  SUBSCRIBED_EVENT_LAST_CANDLE_UPDATED
} from "../Sockets/SocketEvents"

type RawCandle = {
  time: string,
  open: number,
  high: number,
  low: number,
  close: number,
  size: string,
  market: string,
  pair: string,
}

type ProcessCandleCallback = (candles: { [key: string]: Candle }) => void

class CandleSocket {
  constructor(socket: AppSocket) {
    this.socket = socket
  }

  registerLastCandleEvent(processCandles: ProcessCandleCallback) {
    this.socket.socketio.on(SOCKET_EVENT_LAST_CANDLE_UPDATED, (rawCandle: RawCandle) => {
      // Todo: figure out, how to place validation function too (without dependency on store)
      CandleSocket.processRawCandles([rawCandle], processCandles)
    })
  }

  reloadCandles(
    market: string,
    pair: string,
    interval: Interval,
    candleStorage: string,
    candleSize: string,
    processCandles: ProcessCandleCallback
  ) {
    const getCandlesData = {
      pair: pair,
      market: market,
      interval: interval.toIso(),
      candle_storage: candleStorage,
      candle_size: candleSize,
    }

    this.socket.emit(SOCKET_EVENT_GET_CANDLES, getCandlesData, (status: String, rawCandles: Array<RawCandle>) => {
      const validateFilterFunction = (candle: Candle) => {
        const isValid = candle.size === candleSize && candle.pair === pair && candle.market === market
        if (!isValid) {
          console.error('Unexpected candle came from socket (not subscribed for)', candle)
        }
        return isValid
      }

      CandleSocket.processRawCandles(rawCandles, processCandles, validateFilterFunction)
      this.subscribeToCandlesFeed(candleStorage, market, pair, candleSize)
    })
  }

  static processRawCandles(
    rawCandles: Array<RawCandle>,
    processCandles: ProcessCandleCallback,
    validateFilterFunction: (candle: Candle) => boolean = (candle: Candle) => candle
  ) {
    console.log('Received CANDLES', Object.values(rawCandles).length)
    const candles = CandleSocket.parseCandlesDataIntoStateObject(rawCandles)
    processCandles(candles.filter(validateFilterFunction))
  }

  subscribeToCandlesFeed(candleStorage: string, market: string, pair: string, candleSize: string) {
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
      }
    )
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

    return new Candle(
      date,
      +rawCandle.open,
      +rawCandle.high,
      +rawCandle.low,
      +rawCandle.close,
      0,
      rawCandle.size,
      rawCandle.market,
      rawCandle.pair
    )
  }
}

const candleSocketInstance: CandleSocket = new CandleSocket(socket)

export {
  CandleSocket,
  candleSocketInstance,
}
