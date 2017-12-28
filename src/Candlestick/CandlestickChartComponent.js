import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import CandleStickStockScaleChart from "./CandleStickStockScaleChart"
import SelectPairComponent from "../Pair/SelectPairComponent"
import selectPairStore from "../Pair/SelectPairStore"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component {

  constructor(props) {
    super(props)

    let since = new Date()
    since.setHours(since.getHours() - 2)

    this.props.chartStore.getData('USD_BTC', 'bittrex', {since: since, till: null})
  }

  render() {
    const data = Object.values(this.props.chartStore.data)

    if (data.length === 0) {
      return <Spinner/>
    }

    return (
      <div>
        <SelectPairComponent store={selectPairStore}/>
        <CandleStickStockScaleChart type="svg" data={data}/>
      </div>
    )
  }

})


export default CandlestickChartComponent
