import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import CandleStickStockScaleChart from "./CandleStickStockScaleChart"
import {NonIdealState} from "@blueprintjs/core/dist/components/non-ideal-state/nonIdealState"
import FilterComponent from "../Filter/FilterComponent"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component {

  static renderChart(data) {
    if (data === null) {
      return <NonIdealState title="Loading..." description={<Spinner/>}/>
    }

    if (data.length < 5) {
      return <NonIdealState
        visual="search"
        title="No data (or not enough) for candlestick chat."
        description={<span>Does backend synchronize this pair from the selected market?</span>}
      />
    }

    return <CandleStickStockScaleChart type="svg" data={data}/>
  }

  render() {
    let data = this.props.candleStickStore.data
    data = data !== null ? Object.values(this.props.candleStickStore.data) : null

    return (
      <div>
        <FilterComponent store={this.props.filterStore}/>
        {CandlestickChartComponent.renderChart(data)}
      </div>
    )
  }

})


export default CandlestickChartComponent
