// @flow
import {
  DIRECTION_SELL, Order, ORDER_TYPE_LIMIT, OrderDirectionAggregate, STATUS_CANCELED, STATUS_CLOSED,
  STATUS_OPEN
} from "./Order"

const _createDummyOrder = (): Order => {
  const createdAt = new Date(2018, 0, 1, 5, 6, 0)
  const closedAt = new Date(2018, 0, 1, 5, 6, 35)
  return new Order(
    'ABCDEFGH',
    'yoloolooolololololooo',
    'foo_market',
    DIRECTION_SELL,
    createdAt,
    'USD_BTC',
    ORDER_TYPE_LIMIT,
    '13',
    '8000',
    '',
    STATUS_CLOSED,
    closedAt,
    null
  )
}

it('test order constructor', () => {
  const order = _createDummyOrder()
  expect(order).toEqual({
    "canceledAt": null,
    "closedAt": new Date(2018, 0, 1, 5, 6, 35),
    "createdAt": new Date(2018, 0, 1, 5, 6, 0),
    "direction": "sell",
    "idOnMarket": "",
    "market": "foo_market",
    "orderId": "ABCDEFGH",
    "strategyRunId": "yoloolooolololololooo",
    "pair": "USD_BTC",
    "quantity": "13",
    "rate": "8000",
    "status": "closed",
    "type": "limit",
  })
})

it('test order aggregate', () => {
  const aggregate = new OrderDirectionAggregate(Date(2018, 0, 1, 5, 6, 0), DIRECTION_SELL)

  expect(aggregate.maxValue()).toBe(0)
  expect(aggregate.countOpen).toBe(0)
  expect(aggregate.countClosed).toBe(0)
  expect(aggregate.countCanceled).toBe(0)

  aggregate.increment(STATUS_CLOSED)

  expect(aggregate.maxValue()).toBe(1)
  expect(aggregate.countOpen).toBe(0)
  expect(aggregate.countClosed).toBe(1)
  expect(aggregate.countCanceled).toBe(0)

  aggregate.increment(STATUS_OPEN)
  aggregate.increment(STATUS_OPEN)

  expect(aggregate.maxValue()).toBe(2)
  expect(aggregate.countOpen).toBe(2)
  expect(aggregate.countClosed).toBe(1)
  expect(aggregate.countCanceled).toBe(0)

  const newAggregate = new OrderDirectionAggregate(Date(2018, 0, 1, 5, 6, 30), DIRECTION_SELL)
  newAggregate.increment(STATUS_CANCELED)
  newAggregate.increment(STATUS_CANCELED)
  newAggregate.increment(STATUS_CANCELED)
  newAggregate.increment(STATUS_CANCELED)

  aggregate.addAggregate(newAggregate)

  expect(aggregate.maxValue()).toBe(4)
  expect(aggregate.countOpen).toBe(2)
  expect(aggregate.countClosed).toBe(1)
  expect(aggregate.countCanceled).toBe(4)
})
