// @flow

import {MainChartStore} from "./MainChartStore"
import {UNIT_DAY, UNIT_MINUTE} from "../Candle/CandleSize/CandleSize"
import {CHART_HEIKIN_ASHI_CANDLE, CHART_STANDARD_CANDLE} from "../CandlestickChart/ChartType"

it('change candle size', () => {
  const store = new MainChartStore(UNIT_MINUTE, 1, CHART_STANDARD_CANDLE)
  expect(store.candleSize).toBe('1-minute')
  expect(store.chartType).toBe(CHART_STANDARD_CANDLE)

  store.setCandleSize(UNIT_DAY, 4)
  expect(store.candleSize).toBe('4-day')

  store.setChartType(CHART_HEIKIN_ASHI_CANDLE)
  expect(store.chartType).toBe(CHART_HEIKIN_ASHI_CANDLE)
})
