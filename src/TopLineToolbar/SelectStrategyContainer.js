// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectStrategyComponent from "../Strategy/SelectStrategyComponent"
import {strategyStoreInstance} from "../Strategy/StrategyStore"

class SelectStrategyContainer extends Component<{}> {

  componentDidMount() {
    strategyStoreInstance.reloadData()
  }

  render = () => {
    return <SelectStrategyComponent
      availableStrategies={strategyStoreInstance.strategies}
      defaultSelectedStrategy={filterStoreInstance.strategy}
      onSelect={filterStoreInstance.changeStrategy}
    />
  }
}

export default observer(SelectStrategyContainer)
