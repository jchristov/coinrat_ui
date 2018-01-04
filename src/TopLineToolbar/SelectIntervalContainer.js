// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import Interval from "../Interval/Interval"
import SelectIntervalComponent from "../Interval/SelectIntervalComponent"
import {candleStoreInstance} from "../Candle/CandleStore"
import {orderStoreInstance} from "../Orders/OrderStore"

class SelectIntervalContainer extends Component<{}> {

  changeInterval = (interval: Interval) => {
    filterStoreInstance.changeInterval(interval)
    orderStoreInstance.reloadByFilter(filterStoreInstance)
    candleStoreInstance.reloadByFilter(filterStoreInstance)
  }

  render = () => {
    return <SelectIntervalComponent
      defaultSelectedInterval={filterStoreInstance.interval}
      onChange={this.changeInterval}
    />
  }
}

export default observer(SelectIntervalContainer)
