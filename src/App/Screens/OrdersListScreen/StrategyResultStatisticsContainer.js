// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import {filterStoreInstance, orderStoreInstance, strategyRunStoreInstance} from "../../diContainer"
import StrategyResultStatisticsComponent from "../../../Strategy/StrategyRun/ResultStatistics/StrategyResultStatisticsComponent"
import {Order} from "../../../Orders/Order"

class StrategyResultStatisticsContainer extends Component<{}> {

  render = () => {
    return <StrategyResultStatisticsComponent
      strategyRun={strategyRunStoreInstance.strategyRuns.get(filterStoreInstance.strategyRunId)}
      orders={orderStoreInstance.orders.slice()
        .filter((order: Order) => order.strategyRunId === filterStoreInstance.strategyRunId)}
    />
  }
}

export default observer(StrategyResultStatisticsContainer)
