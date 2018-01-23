// @flow
import {CandleStorageStore} from "./CandleStorageStore"

it('reloadData calls socket load function', () => {
  const loadCandleStoragesMock = jest.fn()
  const socketMock = {loadCandleStorages: loadCandleStoragesMock}
  const candleStorageStore = new CandleStorageStore(socketMock)
  candleStorageStore.reloadData(() => undefined)
  expect(loadCandleStoragesMock.mock.calls.length).toBe(1)
})

it('setCandleStorages saves new values', () => {
  const candleStorageStore = new CandleStorageStore()
  expect(candleStorageStore.candleStorages).toEqual({})
  const newCandleStorages = {foo: {key: 'foo', title: 'Foo'}}
  candleStorageStore.setCandleStorages(newCandleStorages)
  expect(candleStorageStore.candleStorages).toEqual(newCandleStorages)
})
