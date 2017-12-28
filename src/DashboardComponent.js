import React, {Component} from 'react'
import CandlestickChartComponent from "./Candlestick/CandlestickChartComponent"
import candleStickStore from "./Candlestick/CandleStickStore"
import filterStore from "./Filter/FilterStore"
import FilterComponent from "./Filter/FilterComponent"
import orderStickStore from "./Orders/OrdersStore"
import OrdersVolumeChartComponent from "./Orders/OrdersVolumeChartComponent"

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
