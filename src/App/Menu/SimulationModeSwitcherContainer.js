// @flow
import React from "react"
import {observer} from "mobx-react"
import {Switch} from "@blueprintjs/core"
import {filterStoreInstance, simulationModeStoreInstance} from "../diContainer"
import {MOCK_MARKET_PLUGIN_NAME} from "../../MarketPlugin/MarketPlugin"

const SimulationModeSwitcherContainer = () => {
  const handleSwitch = () => {
    if (simulationModeStoreInstance.isSimulationModeEnabled) {
      simulationModeStoreInstance.turnOff()
    } else {
      simulationModeStoreInstance.turnOn()
      filterStoreInstance.changeMarketPlugin(MOCK_MARKET_PLUGIN_NAME)
    }
  }

  return <Switch
    style={{marginTop: 9 + 'px'}}
    defaultChecked={simulationModeStoreInstance.isSimulationModeEnabled}
    label={simulationModeStoreInstance.isSimulationModeEnabled ? "Simulation Mode" : "Read-only Mode"}
    onChange={handleSwitch}
  />
}

export default observer(SimulationModeSwitcherContainer)
