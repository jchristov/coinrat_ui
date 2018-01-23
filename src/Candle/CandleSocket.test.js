// @flow

import {CandleSocket} from "./CandleSocket"
import Interval from "../Interval/Interval"
import {Candle} from "./Candle"

it('Reload candles calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const candleStorageSocket = new CandleSocket(socketMock)
  candleStorageSocket.reloadCandles('foo_market', 'USD_BTC', new Interval(null, null), 'candle_storage:bar', '4-hour', () => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_candles')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({
    pair: 'USD_BTC',
    market: 'foo_market',
    interval: {"since": null, "till": null},
    candle_storage: 'candle_storage:bar',
    candle_size: '4-hour'
  })
})

it('Test processing raw candles into objects', () => {
  let result = []
  const process = (candles: Array<Candle>) => {
    result = candles
  }
  CandleSocket.processRawCandles([{
    time: (new Date(2018, 1, 2, 3, 4, 5, 6)).toISOString(),
    open: 1,
    high: 2,
    low: 3,
    close: 4,
    size: '5-minute',
    market: 'yolo_market',
    pair: 'WTF_OMG',
  }], process)
  expect(result.length).toBe(1)
  expect(result[0]).toEqual(
    new Candle(new Date(2018, 1, 2, 3, 4, 5, 6), 1, 2, 3, 4, 0, '5-minute', 'yolo_market', 'WTF_OMG')
  )
})
