import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import CandleStickStockScaleChart from "./CandleStickStockScaleChart"
import SelectPairComponent from "../Pair/SelectPairComponent"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component {

  constructor(props) {
    super(props)

    this.props.chartStore.reloadData()
  }

  render() {
    const data = Object.values(this.props.chartStore.data)

    return (
      <div>
        <SelectPairComponent store={this.props.chartStore}/>
        {data.length !== 0 ? <CandleStickStockScaleChart type="svg" data={data}/> : <Spinner/>}
      </div>
    )
  }

})


export default CandlestickChartComponent
