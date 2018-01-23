// @flow
import {Candle} from "./Candle"

it('test constructor', () => {
  const candle = new Candle(new Date(2018, 1, 1, 5, 6, 0), 10000, 10001, 10002, 10003, 0, '1-minute', 'foo_market')
  expect(candle.date).toEqual(new Date(2018, 1, 1, 5, 6, 0))
  expect(candle.open).toBe(10000)
  expect(candle.high).toBe(10001)
  expect(candle.low).toBe(10002)
  expect(candle.close).toBe(10003)
  expect(candle.volume).toBe(0)
  expect(candle.size).toBe('1-minute')
  expect(candle.market).toBe('foo_market')
})
