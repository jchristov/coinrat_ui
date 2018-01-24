// @flow
import {OrderStorageSocket} from "./OrderStorageSocket"

it('Load balances calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const orderStorageSocket = new OrderStorageSocket(socketMock)
  orderStorageSocket.loadOrderStorages(() => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_order_storages')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({})
})
