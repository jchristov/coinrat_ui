// @flow
import {OrderStore} from "./OrderStore"
import {Interval} from "../Interval/Interval"
import {DIRECTION_SELL, Order, ORDER_TYPE_LIMIT, STATUS_CLOSED} from "./Order"

const _createdAt = new Date(2018, 0, 1, 5, 6, 0)
const _createDummyOrder = (): Order => {
  const closedAt = new Date(2018, 0, 1, 5, 6, 35)
  return new Order(
    'ABCDEFGH',
    'yoloolooolololololooo',
    'foo_market',
    DIRECTION_SELL,
    _createdAt,
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

it('Load balances calls emit function', () => {
  const loadOrderStoragesMock = jest.fn()
  const registerNewOrderEventMock = jest.fn()
  const socketMock = {
    reloadOrders: loadOrderStoragesMock,
    registerNewOrderEvent: registerNewOrderEventMock,
  }
  const orderStore = new OrderStore(socketMock)

  orderStore.reloadData('foo_market', 'USD_BTC', new Interval(null, null), 'order_storage_bar', () => undefined)

  expect(loadOrderStoragesMock.mock.calls.length).toBe(1)
  expect(loadOrderStoragesMock.mock.calls[0][0]).toBe('foo_market')
  expect(loadOrderStoragesMock.mock.calls[0][1]).toBe('USD_BTC')
  expect(loadOrderStoragesMock.mock.calls[0][3]).toBe('order_storage_bar')

  expect(registerNewOrderEventMock.mock.calls.length).toBe(1)
})

it('reloadData calls socket load function', () => {
  const socketMock = {reloadOrders: jest.fn(), registerNewOrderEvent: jest.fn(),}
  const orderStore = new OrderStore(socketMock)
  expect(orderStore.orders.toJS()).toEqual([])
  expect(orderStore.buyOrders.toJS()).toEqual({})
  expect(orderStore.sellOrders.toJS()).toEqual({})

  const newOrder = _createDummyOrder()
  orderStore.processOrders([newOrder])

  expect(orderStore.orders.toJS()).toEqual([newOrder])
  expect(orderStore.buyOrders.toJS()).toEqual({})

  expect(orderStore.sellOrders.toJS()["2018-01-01 05:06:00"].countClosed).toBe(1)
})
