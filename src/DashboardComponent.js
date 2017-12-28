import React, {Component} from 'react'
import CandlestickChartComponent from "./Candlestick/CandlestickChartComponent"
import candleStickStore from "./Candlestick/CandleStickStore"
import filterStore from "./Filter/FilterStore"
import FilterComponent from "./Filter/FilterComponent"

class DashboardComponent extends Component {
  render() {

    return (
      <div>
        <FilterComponent store={filterStore}/>
        <CandlestickChartComponent store={candleStickStore}/>
      </div>
    )
  }
}

export default DashboardComponent
