// @flow
import {MarketPluginSocket} from "./MarketPluginSocket"

it('Load MarketPlugins calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const pairSocket = new MarketPluginSocket(socketMock)
  pairSocket.loadMarketPlugins('foo_market_plugin', () => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_market_plugins')
})
