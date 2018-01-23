// @flow
import React from 'react'
import {observer} from "mobx-react"
import {simulationModeStoreInstance} from '../diContainer'
import type {TopLineAllToolbarComponentProps} from "./TopLineAllToolbarComponent"
import {TopLineToolbarComponent} from "./TopLineAllToolbarComponent"


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
