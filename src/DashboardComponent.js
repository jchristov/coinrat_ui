import React, {Component} from 'react'
import CandlestickChartComponent from "./Candlestick/CandlestickChartComponent"
import candleStickStore from "./Candlestick/CandleStickStore"

class DashboardComponent extends Component {
  render() {
    return <CandlestickChartComponent chartStore={candleStickStore}/>
  }
}

export default DashboardComponent
