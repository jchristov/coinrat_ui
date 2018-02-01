// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import StrategyResultStatisticsComponent from "./StrategyResultStatisticsComponent"
import {DIRECTION_SELL, Order, ORDER_TYPE_LIMIT, STATUS_CLOSED} from "../../../Orders/Order"
import {Interval} from "../../../Interval/Interval"
import {StrategyRun} from "../StrategyRun"

it('renders correctly', () => {
  const strategyRun = new StrategyRun(
    'this is ID',
    new Date(2018, 0, 1, 0, 0, 0),
    '',
    '',
    '',
    '',
    new Interval(new Date(2018, 0, 1, 0, 0, 0), new Date(2018, 0, 2, 0, 0, 0)),
    '',
    ''
  )
  const orders = [new Order(
    'ABCDEFGH',
    'yoloolooolololololooo',
    'foo_market',
    DIRECTION_SELL,
    new Date(2018, 0, 1, 0, 0, 0),
    'USD_BTC',
    ORDER_TYPE_LIMIT,
    '13',
    '8000',
    '',
    STATUS_CLOSED,
    new Date(2018, 0, 1, 0, 0, 0),
    null
  )]
  const tree = renderer
    .create(
      <StrategyResultStatisticsComponent orders={orders} strategyRun={strategyRun}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
