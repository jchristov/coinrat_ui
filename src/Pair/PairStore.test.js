// @flow
import {PairStore} from "./PairStore"

it('Load pairs calls emit function', () => {
  const loadPairStoragesMock = jest.fn()
  const socketMock = {
    loadPairs: loadPairStoragesMock,
  }
  const pairStore = new PairStore(socketMock)

  pairStore.reloadData('market_name', 'market_plugin_name', () => undefined)

  expect(loadPairStoragesMock.mock.calls.length).toBe(1)
})

it('reloadData calls socket load function', () => {
  const pairStore = new PairStore({loadPairs: jest.fn()})
  expect(pairStore.pairs).toEqual({})

  const newPair = {key: 'USD_BTC', title: 'USD-BTC'}
  pairStore.setPairs({USD_BTC: newPair})

  expect(pairStore.pairs['USD_BTC']).toEqual(newPair)
})
