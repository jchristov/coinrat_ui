// @flow

import {OrdersSocket} from "./OrderSocket"
import {Interval} from "../Interval/Interval"
import {DIRECTION_BUY, Order, ORDER_TYPE_MARKET, STATUS_CANCELED} from "./Order"

it('Reload orders calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const orderStorageSocket = new OrdersSocket(socketMock)
  orderStorageSocket.reloadOrders(
    'foo_market',
    'USD_BTC',
    new Interval(null, null),
    'order_storage:bar',
    'a31ba4c4-1eb3-4b1e-bd2d-f04ae03a98e3',
    () => undefined
  )
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_orders')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({
    "interval": {"since": null, "till": null},
    "market": "foo_market",
    "order_storage": "order_storage:bar",
    "pair": "USD_BTC",
    "strategy_run_id": "a31ba4c4-1eb3-4b1e-bd2d-f04ae03a98e3",
  })
})

it('Test processing raw orders into objects', () => {
  let result = []
  const process = (orders: Array<Order>) => {
    result = orders
  }
  OrdersSocket.processRawOrders([{
    order_id: 'ABCDEF',
    market: 'foo_market',
    pair: 'WTF_OMG',
    created_at: (new Date(2018, 0, 2, 3, 4, 5, 1)).toISOString(),
    direction: DIRECTION_BUY,
    type: ORDER_TYPE_MARKET,
    quantity: '1.5',
    rate: '10500',
    id_on_market: 'bzz',
    status: STATUS_CANCELED,
    closed_at: (new Date(2018, 0, 2, 3, 4, 5, 2)).toISOString(),
    canceled_at: (new Date(2018, 0, 2, 3, 4, 5, 3)).toISOString(),
  }], process)
  expect(result.length).toBe(1)
  expect(result[0]).toEqual({
    "canceledAt": new Date(2018, 0, 2, 3, 4, 5, 3),
    "closedAt": new Date(2018, 0, 2, 3, 4, 5, 2),
    "createdAt": new Date(2018, 0, 2, 3, 4, 5, 1),
    "direction": "buy",
    "idOnMarket": "bzz",
    "market": "foo_market",
    "orderId": "ABCDEF",
    "pair": "WTF_OMG",
    "portfolioSnapshot": null,
    "quantity": "1.5",
    "rate": "10500",
    "status": "canceled",
    "type": "market"
  })
})
