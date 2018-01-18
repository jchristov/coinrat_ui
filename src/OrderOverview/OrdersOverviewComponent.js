// @flow
import React, {Component} from 'react'
import OrdersTableContainer from "./OrdersTableContainer"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Interval from "../Interval/Interval"
import {orderStoreInstance} from "../Orders/OrderStore"
import TopLineOrdersToolbarComponent from "../TopLineToolbar/TopLineOrdersToolbarComponent"

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

  render = () => <div>
    <TopLineOrdersToolbarComponent/>
    <OrdersTableContainer/>
  </div>
}

export default OrdersOverviewComponent
