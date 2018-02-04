// @flow
import {MarketPluginStore} from "./MarketPluginStore"

it('Load market plugins calls emit function', () => {
  const loadMarketPluginStoragesMock = jest.fn()
  const socketMock = {
    loadMarketPlugins: loadMarketPluginStoragesMock,
  }
  const marketPluginStore = new MarketPluginStore(socketMock)
  marketPluginStore.reloadData()
  expect(loadMarketPluginStoragesMock.mock.calls.length).toBe(1)
})

it('reloadData calls socket load function', () => {
  const marketPluginStore = new MarketPluginStore({loadMarketPlugins: jest.fn()})
  expect(marketPluginStore.marketPlugins).toEqual({})

  const newMarketPlugin = {key: 'coinrat_bittrex', title: 'coinrat_bittrex'}
  marketPluginStore.setMarketPlugins({'coinrat_bittrex': newMarketPlugin})

  expect(marketPluginStore.marketPlugins['coinrat_bittrex']).toEqual(newMarketPlugin)
})
