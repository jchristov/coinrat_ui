// @flow

import {minuteAggregationFunction} from "./aggregatorFunctions"

it('aggregate functions correctly aggregates date under zero seconds', () => {
  expect(minuteAggregationFunction(new Date(2018, 1, 1, 0, 0, 0, 0))).toEqual(new Date(2018, 1, 1, 0, 0, 0, 0))
  expect(minuteAggregationFunction(new Date(2018, 1, 1, 5, 5, 5, 4567))).toEqual(new Date(2018, 1, 1, 5, 5, 0, 0))
})
