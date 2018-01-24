// @flow
import {MarketSocket} from "./MarketSocket"

it('Load Markets calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const marketSocket = new MarketSocket(socketMock)
  marketSocket.loadMarkets(() => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_markets')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({})
})
