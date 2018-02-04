// @flow
import {PairSocket} from "./PairSocket"

it('Load Pairs calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const pairSocket = new PairSocket(socketMock)
  pairSocket.loadPairs('foo_market', 'foo_market_plugin_name', () => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_pairs')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({
    "market_name": "foo_market",
    "market_plugin_name": 'foo_market_plugin_name',
  })
})
