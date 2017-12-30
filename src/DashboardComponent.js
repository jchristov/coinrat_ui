// @flow
import React, {Component} from 'react'
import OrdersVolumeChartComponent from "./Orders/OrdersVolumeChartComponent"
import TopLineToolbarComponent from "./TopLineToolbar/TopLineToolbarComponent"
import CandlestickChartComponent from "./Candle/CandlestickChartComponent"
import candlesStore from "./Candle/CandleStore"
import {filterStoreInstance} from "./TopLineToolbar/FilterStore"
import {orderStoreInstance} from "./Orders/OrderStore"

class DashboardComponent extends Component {
  render() {
    return (
      <div>
        <TopLineToolbarComponent filterStore={filterStoreInstance} orderStore={orderStoreInstance}/>
        <CandlestickChartComponent store={candlesStore}/>
        <OrdersVolumeChartComponent store={orderStoreInstance}/>
      </div>
    )
  }
}

export default DashboardComponent
