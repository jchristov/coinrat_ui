// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import OrdersChart from "./OrdersChart"
import {NonIdealState, Spinner} from "@blueprintjs/core/"
import {OrderStore} from "./OrderStore"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {Flex, Box} from 'reflexbox'
import {STATUS_CANCELED, STATUS_CLOSED, STATUS_OPEN} from "./Order"
import {ORDERS_STATUS_COLORS} from "./ChartColors"

type Props = {
  store: OrderStore,
}

const OrdersVolumeChartComponent = observer(class OrdersVolumeChartComponent extends Component<Props> {
  props: Props

  renderChart = () => {
    const interval = filterStoreInstance.selectedInterval.withClosedFromRight(new Date())
    const buyOrders = Object.values(this.props.store.buyOrders.toJS())
    const sellOrders = Object.values(this.props.store.sellOrders.toJS())

    if (buyOrders.length < 1 && sellOrders.length < 1) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No orders."
          description={<span>Run strategy to do some orders.</span>}
        />
      </div>
    }
    return <OrdersChart type="svg" buyOrders={buyOrders} sellOrders={sellOrders} interval={interval}/>
  }

  render() {
    const statuses = ORDERS_STATUS_COLORS

    return <div>
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
    </div>
  }

})


export default OrdersVolumeChartComponent
