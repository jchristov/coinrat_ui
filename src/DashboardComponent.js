import React, {Component} from 'react'
import orderStore from "./Orders/OrderStore"
import OrdersVolumeChartComponent from "./Orders/OrdersVolumeChartComponent"
import filterStore from "./TopLineToolbar/FilterStore"
import TopLineToolbarComponent from "./TopLineToolbar/TopLineToolbarComponent"
import CandlestickChartComponent from "./Candle/CandlestickChartComponent"
import candlesStore from "./Candle/CandleStore"

class DashboardComponent extends Component {
  render() {

    return (
      <div>
        <TopLineToolbarComponent filterStore={filterStore} orderStore={orderStore}/>
        <CandlestickChartComponent store={candlesStore}/>
        <OrdersVolumeChartComponent store={orderStore}/>
      </div>
    )
  }
}

export default DashboardComponent
