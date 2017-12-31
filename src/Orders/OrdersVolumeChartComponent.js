// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import OrdersChart from "./OrdersChart"
import {NonIdealState} from "@blueprintjs/core/dist/components/non-ideal-state/nonIdealState"
import {OrderStore} from "./OrderStore"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import Interval from "../Interval/Interval"

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

    if (orders.length < 5) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No data (or not enough) for orders chat."
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

})


export default OrdersVolumeChartComponent
