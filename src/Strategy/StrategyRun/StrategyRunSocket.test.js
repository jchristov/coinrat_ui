// @flow
import {StrategyRunSocket} from "./StrategyRunSocket"

it('Load strategy runs calls emit function', () => {
  const emitFunctionMock = jest.fn()
  const socketMock = {emit: emitFunctionMock}
  const strategyRunSocket = new StrategyRunSocket(socketMock)
  strategyRunSocket.loadStrategyRuns(() => undefined)
  expect(emitFunctionMock.mock.calls.length).toBe(1)
  expect(emitFunctionMock.mock.calls[0][0]).toBe('get_strategy_runs')
  expect(emitFunctionMock.mock.calls[0][1]).toEqual({})
})
