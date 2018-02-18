// @flow
import {BalanceSocket} from "./BalanceSocket"

it('Load balances calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const balanceSocket = new BalanceSocket(socketMock)
  balanceSocket.loadBalances('foo', 'bar', () => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_balance')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({market_plugin_name: 'foo', market_name: 'bar'})
})
