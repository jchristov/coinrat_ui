import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import CandlesChart from "./CandlesChart"
import {NonIdealState} from "@blueprintjs/core/dist/components/non-ideal-state/nonIdealState"
import filterStore from "../TopLineToolbar/FilterStore"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component {

  render() {
    let data = this.props.store.candles
    data = data !== null ? Object.values(this.props.store.candles) : null

    if (data === null) {
      return <NonIdealState title="Loading..." description={<Spinner/>}/>
    }

    if (data.length < 5) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No data (or not enough) for candlestick chat."
          description={<span>Does backend synchronize this pair from the selected market?</span>}
        />
      </div>
    }

    const since = filterStore.selectedInterval.since
    let till = filterStore.selectedInterval.till

    if (till === null) {
      till = new Date()
    }

    return <CandlesChart type="svg" data={data} since={since} till={till}/>
  }

})


export default CandlestickChartComponent
