// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance, orderStoreInstance, strategyRunStoreInstance} from "../diContainer"
import SelectStrategyRunComponent from "../../Strategy/StrategyRun/SelectStrategyRunComponent"
import {StrategyRun} from "../../Strategy/StrategyRun/StrategyRun"

class SelectStrategyRunContainer extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {isLoading: true}
  }

  componentDidMount() {
    strategyRunStoreInstance.reloadData(() => {
      this.setState({isLoading: false})
    })
  }

  changeStrategyRun = (strategyRunName: string) => {
    filterStoreInstance.changeStrategyRun(strategyRunName)
    orderStoreInstance.reloadByFilter(filterStoreInstance)
  }

  static getItemsForStrategyRunSelectBox() {
    let availableStrategyRuns = {}

    Object.values(strategyRunStoreInstance.strategyRuns.toJS()).forEach((strategyRun: StrategyRun) => {
      availableStrategyRuns[strategyRun.strategyRunId] = {
        key: strategyRun.strategyRunId,
        title: `${strategyRun.strategyName} - ${strategyRun.runAt.toLocaleString()}`
      }
    })

    return availableStrategyRuns
  }

  render = () => {
    return <SelectStrategyRunComponent
      availableStrategyRuns={SelectStrategyRunContainer.getItemsForStrategyRunSelectBox()}
      defaultSelectedStrategyRun={filterStoreInstance.strategyRunId}
      onSelect={this.changeStrategyRun}
      isLoading={this.state.isLoading}
    />
  }
}

export default observer(SelectStrategyRunContainer)
