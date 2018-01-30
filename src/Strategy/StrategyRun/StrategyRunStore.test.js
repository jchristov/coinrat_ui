// @flow
import {StrategyRunStore} from "./StrategyRunStore"
import {StrategyRun} from "./StrategyRun"
import {Interval} from "../../Interval/Interval"

it('reloadData calls socket load function', () => {
  const loadStrategyRunsMock = jest.fn()
  const socketMock = {loadStrategyRuns: loadStrategyRunsMock}
  const strategyRunStore = new StrategyRunStore(socketMock)
  strategyRunStore.reloadData(() => undefined)
  expect(loadStrategyRunsMock.mock.calls.length).toBe(1)
})

it('setStrategyRuns saves new values', () => {
  const strategyRunStore = new StrategyRunStore()
  expect(strategyRunStore.strategyRuns).toEqual({})
  const newStrategyRuns = [new StrategyRun('', new Date(), '', '', '', '', Interval(), '', '')]
  strategyRunStore.setStrategyRuns(newStrategyRuns)
  expect(strategyRunStore.strategyRuns).toEqual(newStrategyRuns)
})
