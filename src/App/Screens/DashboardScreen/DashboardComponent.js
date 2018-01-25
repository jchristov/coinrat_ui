// @flow
import React, {Component} from 'react'
import CandlesChartContainer from "./CandlesChartContainer"
import {
  candleStoreInstance,
  mainChartStoreInstance,
  filterStoreInstance,
  orderStoreInstance,
} from "../../diContainer"
import Interval from "../../../Interval/Interval"
import TopLineAllToolbarContainer from "../../TopFilter/TopLineAllToolbarContainer"

type Props = {
  pair: string,
  market: string,
  interval: Interval,
  candleStorage: string,
  orderStorage: string,
  strategy: string,
  candleSize: string,
}

class DashboardComponent extends Component<Props> {

  componentDidMount() {
    this.reloadStores()
  }

  reloadStores = () => {
    orderStoreInstance.reloadByFilter(filterStoreInstance)
    candleStoreInstance.reloadByFilter(filterStoreInstance, mainChartStoreInstance.candleSize)
  }

  componentWillReceiveProps(nextProps: Props) {
    const current = this.props

    if (
      current.market !== nextProps.market
      || current.pair !== nextProps.pair
      || current.interval !== nextProps.interval
      || current.candleSize !== nextProps.candleSize
    ) {
      this.reloadStores()
    }

    if (current.candleStorage !== nextProps.candleStorage) {
      candleStoreInstance.reloadByFilter(filterStoreInstance, mainChartStoreInstance.candleSize)
    }

    if (current.orderStorage !== nextProps.orderStorage) {
      orderStoreInstance.reloadByFilter(filterStoreInstance)
    }
  }

  render = () => <div>
    <TopLineAllToolbarContainer/>
    <CandlesChartContainer/>
  </div>
}

export default DashboardComponent
