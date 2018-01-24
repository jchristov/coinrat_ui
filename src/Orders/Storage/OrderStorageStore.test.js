// @flow
import {OrderStorageStore} from "./OrderStorageStore"

it('reloadData calls socket load function', () => {
  const loadOrderStoragesMock = jest.fn()
  const socketMock = {loadOrderStorages: loadOrderStoragesMock}
  const orderStorageStore = new OrderStorageStore(socketMock)
  orderStorageStore.reloadData(() => undefined)
  expect(loadOrderStoragesMock.mock.calls.length).toBe(1)
})

it('setOrderStorages saves new values', () => {
  const orderStorageStore = new OrderStorageStore()
  expect(orderStorageStore.orderStorages).toEqual({})
  const newOrderStorages = {foo: {key: 'foo', title: 'Foo'}}
  orderStorageStore.setOrderStorages(newOrderStorages)
  expect(orderStorageStore.orderStorages).toEqual(newOrderStorages)
})
