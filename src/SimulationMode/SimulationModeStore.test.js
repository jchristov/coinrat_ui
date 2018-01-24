// @flow
import {SimulationModeStore} from "./SimulationModeStore"

it('Simulation mode ON and OFF', () => {
  const store = new SimulationModeStore(true)
  expect(store.isSimulationModeEnabled).toBe(true)
  store.turnOff()
  expect(store.isSimulationModeEnabled).toBe(false)
  store.turnOn()
  expect(store.isSimulationModeEnabled).toBe(true)
})
