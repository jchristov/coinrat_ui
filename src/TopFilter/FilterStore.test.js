// @flow
import {FilterStore} from "./FilterStore"
import {Interval} from "../Interval/Interval"

it('Filter can be changed', () => {
  const newInterval = new Interval(new Date(2018, 0, 1), new Date(2018, 0, 2))

  const store: FilterStore = new FilterStore()
  expect(store.pair).toBe(null)
  expect(store.market).toBe(null)
  expect(store.candleStorage).toBe('influx_db')
  expect(store.orderStorage).toBe(null)
  expect(store.strategy).toBe('double_crossover')
  expect(store.interval).not.toEqual(newInterval)
  expect(store.strategyRunId).toBe(null)


  store.changePair('A')
  store.changeMarket('B')
  store.changeCandleStorage('C')
  store.changeOrderStorage('D')
  store.changeStrategy('E')
  store.changeInterval(newInterval)
  store.changeStrategyRun('F')

  expect(store.pair).toBe('A')
  expect(store.market).toBe('B')
  expect(store.candleStorage).toBe('C')
  expect(store.orderStorage).toBe('D')
  expect(store.strategy).toBe('E')
  expect(store.interval).toEqual(newInterval)
  expect(store.strategyRunId).toBe('F')
})

