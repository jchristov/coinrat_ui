// @flow
import {range} from "lodash/util"
import {createAggregateFromData} from "./ChartAggregate"
import {Candle} from "../Candle/Candle"
import {
  DIRECTION_BUY, DIRECTION_SELL, OrderDirectionAggregate, OrderDirectionType,
  STATUS_CLOSED
} from "../Orders/Order"

const createOrder = (date: Date, closed: number, direction: OrderDirectionType) => {
  const order = new OrderDirectionAggregate(date, direction)
  range(0, closed).forEach(() => order.increment(STATUS_CLOSED))

  return order
}

type TestRunData = {
  expected: {
    buy: { closed: Array<number> },
    sell: { closed: Array<number> },
  },
  expectedMaxOrderTicks: number,
  ordersBuy: Array<OrderDirectionAggregate>,
  ordersSell: Array<OrderDirectionAggregate>,
}

const runs: Array<TestRunData> = [
  {
    expected: {
      buy: {closed: [0, 0, 0, 0, 0, 0, 0, 0, 0]},
      sell: {closed: [0, 0, 0, 0, 0, 0, 0, 0, 0]},
    },
    expectedMaxOrderTicks: 0,
    ordersBuy: [],
    ordersSell: []
  },
  {
    expected: {
      buy: {closed: [3, 2, 5, 0, 0, 10, 0, 0, 0]},
      sell: {closed: [10, 0, 0, 0, 0, 2, 5, 0, 0]},
    },
    expectedMaxOrderTicks: 10,
    ordersBuy: [
      createOrder(new Date(2018, 0, 1, 0, 0, 0), 1, DIRECTION_BUY),
      createOrder(new Date(2018, 0, 2, 0, 0, 0), 2, DIRECTION_BUY), // IMPORTANT: out of order, its not sorted!
      createOrder(new Date(2018, 0, 1, 23, 59, 59), 2, DIRECTION_BUY),
      createOrder(new Date(2018, 0, 3, 0, 0, 0), 5, DIRECTION_BUY),
      // ...
      createOrder(new Date(2018, 0, 6, 0, 0, 0), 5, DIRECTION_BUY),
      createOrder(new Date(2018, 0, 6, 0, 0, 0), 5, DIRECTION_BUY),
    ],
    ordersSell: [
      createOrder(new Date(2018, 0, 1, 0, 0, 0), 10, DIRECTION_SELL),
      // ...
      createOrder(new Date(2018, 0, 6, 0, 0, 0), 2, DIRECTION_SELL),
      createOrder(new Date(2018, 0, 7, 0, 0, 0), 5, DIRECTION_SELL),
    ]
  },
]

it('orders are aggregated correctly with candles', () => {
  runs.forEach((data: TestRunData) => {
    const candles = range(1, 10).map((day: number) => {
      return new Candle(new Date(2018, 0, day, 0, 0, 0), 1, 2, 3, 4, 0, '1-day', 'foo', 'USD_BTC')
    })

    const result = createAggregateFromData(candles, data.ordersBuy, data.ordersSell)

    expect(result.maxOrderTickSize).toBe(data.expectedMaxOrderTicks)

    data.expected.buy.closed.forEach((expectedValue: number, index: number) => {
      expect(result.data[index].aggregate.buyOrderAggregate.countClosed).toBe(expectedValue)
    })
    data.expected.sell.closed.forEach((expectedValue: number, index: number) => {
      expect(result.data[index].aggregate.sellOrderAggregate.countClosed).toBe(expectedValue)
    })
  })
})
