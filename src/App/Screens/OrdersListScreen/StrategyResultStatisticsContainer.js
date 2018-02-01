// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import {filterStoreInstance, orderStoreInstance, strategyRunStoreInstance} from "../../diContainer"
import StrategyResultStatisticsComponent from "../../../Strategy/StrategyRun/ResultStatistics/StrategyResultStatisticsComponent"

class StrategyResultStatisticsContainer extends Component<{}> {

  render = () => {
    return <StrategyResultStatisticsComponent
      strategyRun={strategyRunStoreInstance.strategyRuns.get(filterStoreInstance.strategyRunId)}
      orders={orderStoreInstance.orders.slice()}
    />
  }
}

export default observer(StrategyResultStatisticsContainer)
