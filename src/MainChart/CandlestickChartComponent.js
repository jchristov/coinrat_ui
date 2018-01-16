// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {NonIdealState} from "@blueprintjs/core/dist"
import CandlesChart from "./CandlesChart"
import {Flex, Box} from 'reflexbox'
import {STATUS_CANCELED, STATUS_CLOSED, STATUS_OPEN} from "../Orders/Order"
import {orderStoreInstance} from "../Orders/OrderStore"
import {candleStoreInstance} from "../Candle/CandleStore"
import {ORDERS_STATUS_COLORS} from "../Orders/ChartColors"
import {createAggregateFromData} from "./ChartAggregate"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"

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

    return <CandlesChart type="svg" data={dataArray} interval={interval}/>
  }

  render() {
    const statuses = ORDERS_STATUS_COLORS
    return (
      <Flex align='center top'>
        <Box auto>{this.renderChart()}</Box>
        <Box w={256}>
          <p>Strategy executed from UI is <strong>always</strong> executed against <code>mock</code> market.</p>
          <p>Executing strategy against real market is possible only via command line on the backend server.</p>
          <h5>Legend</h5>
          <ul className="pt-list-unstyled">
            <li><span style={{color: statuses[STATUS_OPEN]}} className="pt-icon-full-circle"/> Open order</li>
            <li><span style={{color: statuses[STATUS_CLOSED]}} className="pt-icon-full-circle"/> Closed order</li>
            <li><span style={{color: statuses[STATUS_CANCELED]}} className="pt-icon-full-circle"/> Canceled order</li>
          </ul>
        </Box>
      </Flex>
    )
  }
})


export default CandlestickChartComponent
