// @flow
import {StatusIndicatorStore} from "./StatusIndicatorStore"

it('Simulation mode ON and OFF', () => {

  const onConnectMock = jest.fn()
  const onDisconnectMock = jest.fn()
  const socketMock = {onConnect: onConnectMock, onDisconnect: onDisconnectMock}

  const store = new StatusIndicatorStore(socketMock)
  expect(store.isOnline).toBe(false)

  expect(onConnectMock.mock.calls.length).toBe(1)

  onConnectMock.mock.calls[0][0]() // call the on-connect handler function provided by store
  expect(store.isOnline).toBe(true)

  expect(onDisconnectMock.mock.calls.length).toBe(1)

  onDisconnectMock.mock.calls[0][0]()  // call the on-disconnect handler function provided by store
  expect(store.isOnline).toBe(false)
})
