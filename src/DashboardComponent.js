import React, {Component} from 'react'
import CandlestickChartComponent from "./Candlestick/CandlestickChartComponent"
import candleStickStore from "./Candlestick/CandleStickStore"
import orderStickStore from "./Orders/OrdersStore"
import OrdersVolumeChartComponent from "./Orders/OrdersVolumeChartComponent"
import filterStore from "./TopLineToolbar/FilterStore"
import FilterComponent from "./TopLineToolbar/TopLineToolbarComponent"

class DashboardComponent extends Component {
  render() {

    return (
      <div>
        <FilterComponent store={filterStore}/>
        <CandlestickChartComponent store={candleStickStore}/>
        <OrdersVolumeChartComponent store={orderStickStore}/>
      </div>
    )
  }
}

export default DashboardComponent
