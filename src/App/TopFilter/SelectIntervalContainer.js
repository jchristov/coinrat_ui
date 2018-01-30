// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance, flashMessageHandler} from "../diContainer"
import {Interval} from "../../Interval/Interval"
import SelectIntervalComponent from "../../Interval/SelectIntervalComponent"

class SelectIntervalContainer extends Component<{}> {

  changeInterval = (interval: Interval) => {
    filterStoreInstance.changeInterval(interval)
  }

  render = () => {
    return <SelectIntervalComponent
      defaultSelectedInterval={filterStoreInstance.interval}
      onChange={this.changeInterval}
      flashMessageHandler={flashMessageHandler}
    />
  }
}

export default observer(SelectIntervalContainer)
