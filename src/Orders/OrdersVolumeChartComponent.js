// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import OrdersChart from "./OrdersChart"
import {NonIdealState, Spinner} from "@blueprintjs/core/"
import {OrderStore} from "./OrderStore"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Interval from "../Interval/Interval"
import {Flex, Box} from 'reflexbox'
import {DIRECTION_BUY, DIRECTION_SELL} from "./Order"
import {ORDERS_COLORS} from "./ChartColors"

type Props = {
  store: OrderStore,
}

const OrdersVolumeChartComponent = observer(class OrdersVolumeChartComponent extends Component<Props> {
  props: Props

  render() {
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

    return <div>
      <h3>Orders</h3>
      <Flex align='center top'>
        <Box auto>
          <OrdersChart type="svg" data={orders} interval={interval}/>
        </Box>
        <Box w={256}>
          <ul className=".pt-list-unstyled">
            <li><span style={{color: ORDERS_COLORS[DIRECTION_BUY]}} className="pt-icon-full-circle"/> Buy order</li>
            <li><span style={{color: ORDERS_COLORS[DIRECTION_SELL]}} className="pt-icon-full-circle"/> Sell order</li>
          </ul>
        </Box>
      </Flex>

    </div>
  }

})


export default OrdersVolumeChartComponent
