// @flow
import {StrategySocket} from "./StrategySocket"

it('Load strategies calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const strategySocket = new StrategySocket(socketMock)
  strategySocket.loadStrategies(() => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_strategies')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({})
})
