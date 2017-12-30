import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import OrdersChart from "./OrdersChart"
import {NonIdealState} from "@blueprintjs/core/dist/components/non-ideal-state/nonIdealState"
import filterStore from "../TopLineToolbar/FilterStore"

const OrdersVolumeChartComponent = observer(class OrdersVolumeChartComponent extends Component {

  render() {
    let data = this.props.store.orders
    data = data !== null ? Object.values(this.props.store.orders) : null

    if (data === null) {
      return <NonIdealState title="Loading..." description={<Spinner/>}/>
    }

    if (data.length < 5) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No data (or not enough) for orders chat."
          description={<span>Run strategy to do some orders.</span>}
        />
      </div>
    }

    const since = filterStore.selectedInterval.since
    let till = filterStore.selectedInterval.till

    if (till === null) {
      till = new Date()
    }

    return <OrdersChart type="svg" data={data} since={since} till={till}/>
  }

})


export default OrdersVolumeChartComponent
