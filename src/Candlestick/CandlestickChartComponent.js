import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import CandleStickStockScaleChart from "./CandleStickStockScaleChart"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component {

  constructor(props) {
    super(props)

    this.props.store.getData('USD_BTC', 'bittrex', {since: null, till: null})
  }

  render() {
    const data = this.props.store.data

    if (data === null) {
      return <Spinner/>
    }

    return <CandleStickStockScaleChart type="svg" data={data}/>
  }

})


export default CandlestickChartComponent
