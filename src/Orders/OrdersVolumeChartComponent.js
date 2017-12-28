import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"
import OrdersChart from "./OrdersChart"
import {NonIdealState} from "@blueprintjs/core/dist/components/non-ideal-state/nonIdealState"

const OrdersVolumeChartComponent = observer(class OrdersVolumeChartComponent extends Component {

  render() {
    let data = this.props.store.data
    data = data !== null ? Object.values(this.props.store.data) : null

    if (data === null) {
      return <NonIdealState title="Loading..." description={<Spinner/>}/>
    }

    if (data.length < 5) {
      return <NonIdealState
        visual="search"
        title="No data (or not enough) for orders chat."
        description={<span>Run strategy to do some orders.</span>}
      />
    }

    return <OrdersChart type="svg" data={data}/>
  }

})


export default OrdersVolumeChartComponent
