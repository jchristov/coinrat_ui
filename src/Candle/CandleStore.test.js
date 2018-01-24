// @flow
import {CandleStore} from "./CandleStore"
import Interval from "../Interval/Interval"
import {Candle} from "./Candle"

it('Load balances calls emit function', () => {
  const loadCandleStoragesMock = jest.fn()
  const registerLastCandleEventMock = jest.fn()
  const socketMock = {
    reloadCandles: loadCandleStoragesMock,
    registerLastCandleEvent: registerLastCandleEventMock,
  }
  const candleStore = new CandleStore(socketMock)

  candleStore.reloadData('foo_market', 'USD_BTC', new Interval(null, null), 'candle_storage_bar', '4-hour', () => undefined)

  expect(loadCandleStoragesMock.mock.calls.length).toBe(1)
  expect(loadCandleStoragesMock.mock.calls[0][0]).toBe('foo_market')
  expect(loadCandleStoragesMock.mock.calls[0][1]).toBe('USD_BTC')
  expect(loadCandleStoragesMock.mock.calls[0][3]).toBe('candle_storage_bar')
  expect(loadCandleStoragesMock.mock.calls[0][4]).toBe('4-hour')

  expect(registerLastCandleEventMock.mock.calls.length).toBe(1)
})

it('reloadData calls socket load function', () => {
  const socketMock = {reloadCandles: jest.fn(), registerLastCandleEvent: jest.fn(),}
  const candleStore = new CandleStore(socketMock)
  expect(candleStore.candles.toJS()).toEqual({})

  const date = new Date(2018, 1, 2, 3, 4, 5, 6)
  const newCandles = [new Candle(date, 1, 2, 3, 4, 0, '5-minute', 'yolo_market', 'WTF_OMG')]
  candleStore.processCandles(newCandles)

  expect(candleStore.candles.toJS()).toEqual({
    "2018-02-02 03:04:05": {
      close: 4,
      date: date,
      high: 2,
      low: 3,
      market: "yolo_market",
      open: 1,
      pair: "WTF_OMG",
      size: "5-minute",
      volume: 0
    }
  })
})
