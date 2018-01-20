// @flow

import {Candle, CandleAggregate} from "./Candle"

it('Candle Aggregation correctly aggregates another aggregation', () => {
  const date = new Date(2018, 1, 1, 0, 0, 0)
  const aggregation = new CandleAggregate(date)

  expect(aggregation.open).toBe(null)
  expect(aggregation.high).toBe(null)
  expect(aggregation.low).toBe(null)
  expect(aggregation.close).toBe(null)

  const aggregateWithValue = new CandleAggregate(date)
  aggregateWithValue.addCandle(new Candle(date, 100, 220, 90, 200))
  aggregation.addCandle(aggregateWithValue)

  expect(aggregation.open).toBe(100)
  expect(aggregation.high).toBe(220)
  expect(aggregation.low).toBe(90)
  expect(aggregation.close).toBe(200)

  const aggregateWithValue2 = new CandleAggregate(date)
  aggregateWithValue2.addCandle(new Candle(date, 0, 320, 50, 400))
  aggregation.addCandle(aggregateWithValue2)

  expect(aggregation.open).toBe(100)
  expect(aggregation.high).toBe(320)
  expect(aggregation.low).toBe(50)
  expect(aggregation.close).toBe(400)
})
