// @flow
import React, {Component} from 'react'
import OrdersVolumeChartComponent from "./Orders/OrdersVolumeChartComponent"
import TopLineToolbarComponent from "./TopLineToolbar/TopLineToolbarComponent"
import CandlestickChartComponent from "./Candle/CandlestickChartComponent"
import {filterStoreInstance} from "./TopLineToolbar/FilterStore"
import {orderStoreInstance} from "./Orders/OrderStore"
import {candleStoreInstance} from "./Candle/CandleStore"

class DashboardComponent extends Component<{}> {
  render() {
    return (
      <div>
        <TopLineToolbarComponent filterStore={filterStoreInstance} orderStore={orderStoreInstance}/>
        <CandlestickChartComponent store={candleStoreInstance}/>
        <OrdersVolumeChartComponent store={orderStoreInstance}/>
      </div>
    )
  }
}

export default DashboardComponent
