// @flow
import {StrategyStore} from "./StrategyStore"
import {Strategy} from "./Strategy"
import {ConfigurationStructure} from "../ConfigurationStructure/ConfigurationStructure"

it('Load balances calls emit function', () => {
  const loadStrategyStoragesMock = jest.fn()
  const socketMock = {
    loadStrategies: loadStrategyStoragesMock,
  }
  const strategyStore = new StrategyStore(socketMock)

  strategyStore.reloadData(() => undefined)

  expect(loadStrategyStoragesMock.mock.calls.length).toBe(1)
})

it('reloadData calls socket load function', () => {
  const strategyStore = new StrategyStore({loadStrategies: jest.fn()})
  expect(strategyStore.strategies.toJS()).toEqual({})

  const strategy = new Strategy('name', 'Title', new ConfigurationStructure([]))
  const newStrategies = [strategy]
  strategyStore.setStrategies(newStrategies)

  expect(strategyStore.strategies.toJS()['name']).toBe(strategy)
})
