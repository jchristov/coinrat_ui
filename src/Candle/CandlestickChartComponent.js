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
    const interval = filterStoreInstance.selectedInterval.withClosedFromRight(new Date())
    const candles = Object.values(this.props.store.candles)

    if (candles.length < 1) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No candles."
          description={<span>Does backend synchronize this pair from the selected market?</span>}
        />
      </div>
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
