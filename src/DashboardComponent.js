// @flow
import React, {Component} from 'react'
import TopLineToolbarComponent from "./TopLineToolbar/TopLineToolbarComponent"
import {filterStoreInstance} from "./TopLineToolbar/FilterStore"
import {orderStoreInstance} from "./Orders/OrderStore"
import {candleStoreInstance} from "./Candle/CandleStore"
import CandlestickChartComponent from "./MainChart/CandlestickChartComponent"

class DashboardComponent extends Component<{}> {
  render() {
    return (
      <div>
        <TopLineToolbarComponent filterStore={filterStoreInstance} orderStore={orderStoreInstance}/>
        <CandlestickChartComponent candleStore={candleStoreInstance} orderStore={orderStoreInstance}/>
      </div>
    )
  }
}

export default DashboardComponent
