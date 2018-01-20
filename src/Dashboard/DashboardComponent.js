// @flow
import React, {Component} from 'react'
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {orderStoreInstance} from "../Orders/OrderStore"
import {candleStoreInstance} from "../Candle/CandleStore"
import Interval from "../Interval/Interval"
import TopLineToolbarComponent from "../TopLineToolbar/TopLineAllToolbarComponent"
import CandlesChartContainer from "./CandlesChartContainer"

type Props = {
  pair: string,
  market: string,
  interval: Interval,
  candleStorage: string,
  orderStorage: string,
  strategy: string,
}

class DashboardComponent extends Component<Props> {

  componentDidMount() {
    this.reloadStores()
  }

  reloadStores = () => {
    orderStoreInstance.reloadByFilter(filterStoreInstance)
    candleStoreInstance.reloadByFilter(filterStoreInstance)
  }

  componentWillReceiveProps(nextProps: Props) {
    const current = this.props

    if (
      current.market !== nextProps.market
      || current.pair !== nextProps.pair
      || current.interval !== nextProps.interval
    ) {
      this.reloadStores()
    }

    if (current.candleStorage !== nextProps.candleStorage) {
      candleStoreInstance.reloadByFilter(filterStoreInstance)
    }

    if (current.orderStorage !== nextProps.orderStorage) {
      orderStoreInstance.reloadByFilter(filterStoreInstance)
    }
  }

  render = () => <div>
    <TopLineToolbarComponent/>
    <CandlesChartContainer/>
  </div>
}

export default DashboardComponent
