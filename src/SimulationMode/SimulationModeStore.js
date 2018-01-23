// @flow
import {extendObservable, action} from 'mobx'

class SimulationModeStore {
  isSimulationModeEnabled: boolean

  constructor(isSimulationModeEnabled: boolean = false) {
    extendObservable(this, {
      isSimulationModeEnabled: isSimulationModeEnabled,
    })
  }

  turnOn = action(() => {
    this.isSimulationModeEnabled = true
  })

  turnOff = action(() => {
    this.isSimulationModeEnabled = false
  })
}

export {
  SimulationModeStore,
}
