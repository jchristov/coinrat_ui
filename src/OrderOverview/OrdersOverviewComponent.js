// @flow
import React, {Component} from 'react'
import OrdersTableContainer from "./OrdersTableContainer"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Interval from "../Interval/Interval"
import {orderStoreInstance} from "../Orders/OrderStore"
import TopLineAllToolbarContainer from "../TopLineToolbar/TopLineAllToolbarContainer"

type Props = {
  pair: string,
  market: string,
  interval: Interval,
  candleStorage: string,
  orderStorage: string,
  strategy: string,
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
    ) {
      orderStoreInstance.reloadByFilter(filterStoreInstance)
    }

    if (current.orderStorage !== nextProps.orderStorage) {
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
    </div>
  }
}

export default OrdersOverviewComponent
