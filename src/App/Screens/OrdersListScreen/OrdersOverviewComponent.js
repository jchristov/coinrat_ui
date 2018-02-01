// @flow
import React, {Component} from 'react'
import OrdersTableContainer from "./OrdersTableContainer"
import {Interval} from "../../../Interval/Interval"
import {filterStoreInstance, orderStoreInstance} from "../../diContainer"
import TopLineAllToolbarContainer from "../../TopFilter/TopLineAllToolbarContainer"
import StrategyResultStatisticsContainer from "./StrategyResultStatisticsContainer"

type Props = {
  pair: string,
  market: string,
  interval: Interval,
  candleStorage: string,
  orderStorage: string,
  strategy: string,
  strategyRunId: string,
}

class OrdersOverviewComponent extends Component<Props> {

  componentDidMount() {
    orderStoreInstance.reloadByFilter(filterStoreInstance)
  }

  componentWillReceiveProps(nextProps: Props) {
    const current = this.props

    if (
      current.market !== nextProps.market
      || current.pair !== nextProps.pair
      || current.interval !== nextProps.interval
      || current.orderStorage !== nextProps.orderStorage
      || current.strategyRunId !== nextProps.strategyRunId
    ) {
      orderStoreInstance.reloadByFilter(filterStoreInstance)
    }
  }

  render = () => {
    const toolbarProps = {
      isPairSelectorEnabled: true,
      isMarketSelectorEnabled: true,
      isMarketConfiguratorEnabled: false,
      isCandleStorageSelectorEnabled: false,
      isOrderStorageSelectorEnabled: true,
      isOrderClearButtonEnabled: true,
      isIntervalSelectorEnabled: true,
      isStrategySelectorEnabled: false,
      isStrategyConfiguratorEnabled: false,
      isRunStrategyButtonEnabled: false,
    }
    return <div>
      <TopLineAllToolbarContainer {...toolbarProps}/>
      <OrdersTableContainer/>
      {filterStoreInstance.strategyRunId && <StrategyResultStatisticsContainer/>}
    </div>
  }
}

export default OrdersOverviewComponent
