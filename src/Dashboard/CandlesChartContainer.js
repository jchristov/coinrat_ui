// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Flex, Box} from 'reflexbox'
import {orderStoreInstance} from "../Orders/OrderStore"
import {candleStoreInstance} from "../Candle/CandleStore"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {NonIdealState} from "@blueprintjs/core"
import {createAggregateFromData} from "../MainChart/ChartAggregate"
import CandlesChartComponent from "../MainChart/CandlesChartComponent"
import DashboardLegendComponent from "./DashboardLegendComponent"
import CandleSizeSelectContainer from "../MainChart/CandleSizeSelectContainer"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component<{}> {

  renderChart = () => {
    const interval = filterStoreInstance.interval.withClosedFromRight(new Date())

    const candles = Object.values(candleStoreInstance.candles.toJS())
    const buyOrders = Object.values(orderStoreInstance.buyOrders.toJS())
    const sellOrders = Object.values(orderStoreInstance.sellOrders.toJS())
    const dataArray = createAggregateFromData(candles, buyOrders, sellOrders)

    if (dataArray.length < 1 || interval.isEmpty()) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No candles."
          description={<span>Does backend synchronize this pair from the selected market?</span>}
        />
      </div>
    }

    return <CandlesChartComponent type="svg" data={dataArray} interval={interval}/>
  }

  render() {
    return <Flex align='center top'>
      <Box auto>
        <Flex column align='center top'>
          <Box><CandleSizeSelectContainer/></Box>
          <Box>{this.renderChart()}</Box>
        </Flex>
      </Box>
      <Box style={{paddingRight: 10 + 'px'}} w={256}><DashboardLegendComponent/></Box>
    </Flex>
  }
})


export default CandlestickChartComponent
