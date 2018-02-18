// @flow
import {ObservableMap} from "mobx"
import {StrategyRunnerStore} from "./StrategyRunnerStore"
import {Interval} from "../Interval/Interval"
import {Market} from "../Market/Market"
import {
  ConfigurationDirective, ConfigurationStructure,
  TYPE_INTEGER
} from "../ConfigurationStructure/ConfigurationStructure"
import {Strategy} from "./Strategy"

it('strategy can be run', () => {
  const filterStoreMock = {
    pair: 'USD_BTC',
    market: 'market_xyz',
    interval: new Interval(new Date(Date.UTC(2018, 0, 1)), new Date(Date.UTC(2018, 0, 2))),
    candleStorage: 'influx_db',
    orderStorage: 'influx_db',
    strategy: 'my_super_secret_strategy',
  }

  const marketStoreMock = {
    markets: new ObservableMap({
      mock: new Market('market_xyz', 'Foo Market', new ConfigurationStructure([
        new ConfigurationDirective('x', TYPE_INTEGER, '', 'XXX', '', true, false, ''),
      ]))
    }),
  }

  const strategyStoreMap = {
    strategies: new ObservableMap({
      my_super_secret_strategy: new Strategy('my_super_secret_strategy', 'My Strategy', new ConfigurationStructure([
        new ConfigurationDirective('y', TYPE_INTEGER, '', 'YYY', '', true, false, ''),
      ])),
    }),
  }

  const mockedEmitFunction = jest.fn()

  const store = new StrategyRunnerStore({emit: mockedEmitFunction}, filterStoreMock, strategyStoreMap, marketStoreMock, () => undefined)
  store.runStrategy()

  expect(mockedEmitFunction.mock.calls.length).toBe(1)
  expect(mockedEmitFunction.mock.calls[0][0]).toBe('run_reply')
  expect(mockedEmitFunction.mock.calls[0][1]).toEqual({
    "candles_storage": "influx_db",
    "market": "mock",
    "market_configuration": {"x": "XXX"},
    "orders_storage": "influx_db",
    "pair": "USD_BTC",
    "since": "2018-01-01T00:00:00.000Z",
    "till": "2018-01-02T00:00:00.000Z",
    "strategy_configuration": {"y": "YYY"},
    "strategy_name": "my_super_secret_strategy",
  })
})
