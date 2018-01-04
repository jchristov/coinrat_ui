// @flow
import React from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectStrategyComponent from "../Strategy/SelectStrategyComponent"

const SelectStrategyContainer = () => {
  const strategies = {
    'double_crossover': {key: 'double_crossover', title: 'Double Crossover'}
  }

  return <SelectStrategyComponent
    availableStrategies={strategies}
    defaultSelectedStrategy={filterStoreInstance.strategy}
    onSelect={filterStoreInstance.changeStrategy}
  />
}

export default observer(SelectStrategyContainer)
