// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import OrdersChart from "./OrdersChart"
import {NonIdealState, Spinner} from "@blueprintjs/core/"
import {OrderStore} from "./OrderStore"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Interval from "../Interval/Interval"
import {Flex, Box} from 'reflexbox'
import {DIRECTION_BUY, DIRECTION_SELL, STATUS_CANCELED, STATUS_CLOSED, STATUS_OPEN} from "./Order"
import {ORDERS_DIRECTION_COLORS, ORDERS_STATUS_COLORS} from "./ChartColors"

type Props = {
  store: OrderStore,
}

const OrdersVolumeChartComponent = observer(class OrdersVolumeChartComponent extends Component<Props> {
  props: Props

  renderChart = () => {
    let orders = this.props.store.orders
    orders = orders !== null ? Object.values(this.props.store.orders) : null

    if (orders === null) {
      return <NonIdealState title="Loading..." description={<Spinner/>}/>
    }

    if (orders.length < 1) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No data for orders chart."
          description={<span>Run strategy to do some orders.</span>}
        />
      </div>
    }

    let interval = filterStoreInstance.selectedInterval
    if (interval.till === null) {
      interval = new Interval(interval.since, new Date())
    }

    return <OrdersChart type="svg" data={orders} interval={interval}/>
  }

  render() {
    const directions = ORDERS_DIRECTION_COLORS
    const statuses = ORDERS_STATUS_COLORS

    return <div>
      <h3>Orders</h3>
      <Flex align='center top'>
        <Box auto>
          {this.renderChart()}
        </Box>
        <Box w={256}>
          <ul className="pt-list-unstyled">
            <li><span style={{color: directions[DIRECTION_BUY]}} className="pt-icon-full-circle"/> Buy order</li>
            <li><span style={{color: directions[DIRECTION_SELL]}} className="pt-icon-full-circle"/> Sell order</li>
          </ul>
          <br />
          <ul className="pt-list-unstyled">
            <li><span style={{color: statuses[STATUS_OPEN]}} className="pt-icon-full-circle"/> Open order</li>
            <li><span style={{color: statuses[STATUS_CLOSED]}} className="pt-icon-full-circle"/> Closed order</li>
            <li><span style={{color: statuses[STATUS_CANCELED]}} className="pt-icon-full-circle"/> Canceled order</li>
          </ul>
        </Box>
      </Flex>
    </div>
  }

})


export default OrdersVolumeChartComponent
