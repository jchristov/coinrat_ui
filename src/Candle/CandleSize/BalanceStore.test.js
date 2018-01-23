// @flow

import {CandleSizeStore, UNIT_DAY, UNIT_MINUTE} from "./CandleSizeStore"

it('change candle size', () => {
  const store = new CandleSizeStore(UNIT_MINUTE, 1)
  expect(store.candleSize).toBe('1-minute')
  store.setCandleSize(UNIT_DAY, 4)
  expect(store.candleSize).toBe('4-day')
})
