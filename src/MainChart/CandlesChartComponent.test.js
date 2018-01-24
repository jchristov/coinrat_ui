// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import CandlesChartComponent from "./CandlesChartComponent"
import Interval from "../Interval/Interval"
import {ChartAggregate} from "./ChartAggregate"
import {Candle} from "../Candle/Candle"

it.skip('renders correctly', () => {
  const tree = renderer
    .create(
      <CandlesChartComponent
        result={{
          data: [new ChartAggregate(new Candle(new Date(2018, 1, 1), 1, 2, 3, 4, 0, '1-minute', 'foo', 'USD_BTC'))],
          maxOrderTickSize: 5
        }}
        width={800}
        ratio={1}
        type={'svg'}
        interval={new Interval(new Date(2018, 1, 1))}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
