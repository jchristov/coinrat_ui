// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance, strategyRunStoreInstance} from "../diContainer"
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

  changeStrategyRun = (strategyRunId: string) => {
    filterStoreInstance.changeStrategyRun(strategyRunId)
    const strategyRun: StrategyRun = strategyRunStoreInstance.strategyRuns.get(strategyRunId)
    filterStoreInstance.changeInterval(strategyRun.interval)
    filterStoreInstance.changePair(strategyRun.pair)
  }

  static getItemsForStrategyRunSelectBox() {
    let availableStrategyRuns = {}

    Object.values(strategyRunStoreInstance.strategyRuns.toJS()).forEach((strategyRun: StrategyRun) => {
      availableStrategyRuns[strategyRun.strategyRunId] = {
        key: strategyRun.strategyRunId,
        title: `${strategyRun.strategyName} - ${strategyRun.runAt.toLocaleString()}`,
        order: strategyRun.runAt.getTime(),
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
