// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectStrategyComponent from "../Strategy/SelectStrategyComponent"
import {Strategy} from "../Strategy/Strategy"
import {strategyStoreInstance} from "../Strategy/StrategyStore"

class SelectStrategyContainer extends Component<{}> {

  componentDidMount() {
    strategyStoreInstance.reloadData()
  }

  changeStrategy = (strategy: string) => {
    filterStoreInstance.changeStrategy(strategy)
  }

  static getItemsForStrategySelectBox() {
    let availableStrategies = strategyStoreInstance.strategies.toJS()

    for (let key in availableStrategies) {
      if (availableStrategies.hasOwnProperty(key)) {
        const strategy: Strategy = availableStrategies[key]
        availableStrategies[key] = {key: strategy.name, title: strategy.title}
      }
    }

    return availableStrategies
  }

  render = () => {
    return <SelectStrategyComponent
      availableStrategies={SelectStrategyContainer.getItemsForStrategySelectBox()}
      defaultSelectedStrategy={filterStoreInstance.strategy}
      onSelect={this.changeStrategy}
    />
  }
}

export default observer(SelectStrategyContainer)
