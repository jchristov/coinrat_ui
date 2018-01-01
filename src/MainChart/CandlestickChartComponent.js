// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {NonIdealState} from "@blueprintjs/core/dist"
import CandlesChart from "./CandlesChart"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {Flex, Box} from 'reflexbox'
import {STATUS_CANCELED, STATUS_CLOSED, STATUS_OPEN} from "../Orders/Order"
import {OrderStore} from "../Orders/OrderStore"
import {CandleStore} from "../Candle/CandleStore"
import {ChartAggregate} from "./ChartAggregate"
import {aggregateDateSecond, calculateAggregateHash} from "../DateAggregate/aggregateHash"
import {ORDERS_STATUS_COLORS} from "../Orders/ChartColors"

type Props = {
  candleStore: CandleStore,
  orderStore: OrderStore,
}

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component<Props> {
  props: Props

  renderChart = () => {
    const interval = filterStoreInstance.selectedInterval.withClosedFromRight(new Date())
    const candles = Object.values(this.props.candleStore.candles.toJS())
    const buyOrders = Object.values(this.props.orderStore.buyOrders.toJS())
    const sellOrders = Object.values(this.props.orderStore.sellOrders.toJS())

    let data: { [key: string]: ChartAggregate } = {}

    for (let i = 0; i < candles.length; i++) {
      const candle = candles[i]
      const date = aggregateDateSecond(candle.date)
      const key = calculateAggregateHash(date)
      if (data[key] === undefined) {
        data[key] = new ChartAggregate(date)
      }
      data[key].candleAggregate = candle
    }

    for (let i = 0; i < buyOrders.length; i++) {
      const order = buyOrders[i]
      const date = aggregateDateSecond(order.dateBucket)
      const key = calculateAggregateHash(date)
      if (data[key] === undefined) {
        data[key] = new ChartAggregate(date)
      }
      data[key].buyOrderAggregate = order
    }

    for (let i = 0; i < sellOrders.length; i++) {
      const order = sellOrders[i]
      const date = aggregateDateSecond(order.dateBucket)
      const key = calculateAggregateHash(date)
      if (data[key] === undefined) {
        data[key] = new ChartAggregate(date)
      }
      data[key].sellOrderAggregate = order
    }

    const dataArray = Object.values(data).sort((first: ChartAggregate, second: ChartAggregate) => {
      if (first.date < second.date) return -1
      if (first.date > second.date) return 1
      return 0
    })

    if (dataArray.length < 1) {
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
        <Box auto>
          {this.renderChart()}
        </Box>
        <Box w={256}>
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
