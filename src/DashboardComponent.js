import React, {Component} from 'react'
import CandlestickChartComponent from "./Candlestick/CandlestickChartComponent"
import candleStickStore from "./Candlestick/CandleStickStore"
import filterStore from "./Filter/FilterStore"

class DashboardComponent extends Component {
  render() {
    return <CandlestickChartComponent filterStore={filterStore} candleStickStore={candleStickStore}/>
  }
}

export default DashboardComponent
