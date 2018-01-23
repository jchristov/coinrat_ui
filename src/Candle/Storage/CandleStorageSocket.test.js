// @flow
import {CandleStorageSocket} from "./CandleStorageSocket"

it('Load balances calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const candleStorageSocket = new CandleStorageSocket(socketMock)
  candleStorageSocket.loadCandleStorages(() => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_candle_storages')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({})
})
