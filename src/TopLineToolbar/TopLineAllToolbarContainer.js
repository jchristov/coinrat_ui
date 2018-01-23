// @flow
import React from 'react'
import {observer} from "mobx-react"
import {TopLineAllToolbarComponentProps, TopLineToolbarComponent} from "./TopLineAllToolbarComponent"
import {simulationModeStoreInstance} from "../SimulationMode/SimulationModeStore"


const TopLineAllToolbarContainer = (props: TopLineAllToolbarComponentProps) => {
  const isSimulation = simulationModeStoreInstance.isSimulationModeEnabled

  const newProps = {
    ...props,
    isMarketConfiguratorEnabled: isSimulation && props.isMarketConfiguratorEnabled,
    isOrderClearButtonEnabled: isSimulation && props.isOrderClearButtonEnabled,
    isStrategySelectorEnabled: isSimulation && props.isStrategySelectorEnabled,
    isStrategyConfiguratorEnabled: isSimulation && props.isStrategyConfiguratorEnabled,
    isRunStrategyButtonEnabled: isSimulation && props.isRunStrategyButtonEnabled,
  }

  return <TopLineToolbarComponent {...newProps}/>
}

export default observer(TopLineAllToolbarContainer)
