// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {NonIdealState, Spinner} from "@blueprintjs/core/dist"
import CandlesChart from "./CandlesChart"
import {CandleStore} from "./CandleStore"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Interval from "../Interval/Interval"
import {Flex, Box} from 'reflexbox'

type Props = {
  store: CandleStore,
}

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component<Props> {
  props: Props

  renderChart = () => {
    let candles = this.props.store.candles
    candles = candles !== null ? Object.values(this.props.store.candles) : null

    if (candles === null) {
      return <NonIdealState title="Loading..." description={<Spinner/>}/>
    }

    if (candles.length < 5) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No data (or not enough) for candlestick chat."
          description={<span>Does backend synchronize this pair from the selected market?</span>}
        />
      </div>
    }

    let interval = filterStoreInstance.selectedInterval
    if (interval.till === null) {
      interval = new Interval(interval.since, new Date())
    }
    return <CandlesChart type="svg" data={candles} interval={interval}/>
  }

  render() {
    return (
      <Flex align='center top'>
        <Box auto>
          {this.renderChart()}
        </Box>
        <Box w={256}>

        </Box>
      </Flex>
    )
  }
})


export default CandlestickChartComponent
