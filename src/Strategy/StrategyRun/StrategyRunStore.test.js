// @flow
import {StrategyRunStore} from "./StrategyRunStore"
import {StrategyRun} from "./StrategyRun"
import {Interval} from "../../Interval/Interval"

it('reloadData calls socket load function', () => {
  const loadStrategyRunsMock = jest.fn()
  const registerNewStrategyRunEventMock = jest.fn()
  const socketMock = {
    loadStrategyRuns: loadStrategyRunsMock,
    registerNewStrategyRunEvent: registerNewStrategyRunEventMock,
  }
  const strategyRunStore = new StrategyRunStore(socketMock)
  strategyRunStore.reloadData(() => undefined)
  expect(loadStrategyRunsMock.mock.calls.length).toBe(1)
  expect(registerNewStrategyRunEventMock.mock.calls.length).toBe(1)
})

it('processStrategyRuns saves new values', () => {
  const strategyRunStore = new StrategyRunStore({registerNewStrategyRunEvent: jest.fn()})
  expect(strategyRunStore.strategyRuns.toJS()).toEqual({})
  const strategyRun = new StrategyRun(
    'this is ID',
    new Date(),
    '',
    '',
    '',
    '',
    new Interval(new Date(2018, 0, 1, 0, 0, 0), new Date(2018, 0, 1, 0, 0, 0)),
    '',
    ''
  )
  strategyRunStore.processStrategyRuns([strategyRun])
  expect(strategyRunStore.strategyRuns.toJS()).toEqual({'this is ID': strategyRun})
})
