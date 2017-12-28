import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import CandleStickStockScaleChart from "./CandleStickStockScaleChart"
import SelectPairComponent from "../Pair/SelectPairComponent"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import {NonIdealState} from "@blueprintjs/core/dist/components/non-ideal-state/nonIdealState"
import SelectIntervalComponent from "../Interval/SelectIntervalComponent"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component {

  static renderChart(data) {
    if (data === null) {
      return <NonIdealState title="Loading..." description={<Spinner/>}/>
    }

    if (data.length === 0) {
      return <NonIdealState
        visual="search"
        title="No data for candlestick chat."
        description={<span>Does backend synchronize this pair from the selected market?</span>}
      />
    }

    return <CandleStickStockScaleChart type="svg" data={data}/>
  }

  render() {
    let data = this.props.chartStore.data
    data = data !== null ? Object.values(this.props.chartStore.data) : null

    return (
      <div>
        <div>
          <SelectPairComponent store={this.props.chartStore}/>
          <SelectMarketComponent store={this.props.chartStore}/>
          <SelectIntervalComponent store={this.props.chartStore}/>
        </div>
        {CandlestickChartComponent.renderChart(data)}
      </div>
    )
  }

})


export default CandlestickChartComponent
