import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import CandleStickStockScaleChart from "./CandleStickStockScaleChart"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component {

  constructor(props) {
    super(props)

    let since = new Date()
    since.setHours(since.getHours() - 2)

    this.props.store.getData('USD_BTC', 'bittrex', {since: since, till: null})
  }

  render() {
    const data = Object.values(this.props.store.data)

    if (data.length === 0) {
      return <Spinner/>
    }

    return <CandleStickStockScaleChart type="svg" data={data}/>
  }

})


export default CandlestickChartComponent
