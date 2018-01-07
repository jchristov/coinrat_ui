// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectOrdersBackendStorageComponent from "../Orders/SelectOrdersBackendStorageComponent"

class SelectOrderStorageContainer extends Component<{}> {

  changeOrderStorage = (orderStorage: string) => {
    filterStoreInstance.changeOrderStorage(orderStorage)
  }

  render = () => {
    const orderBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    return <SelectOrdersBackendStorageComponent
      availableStorages={orderBackendStorages}
      defaultSelectedOrderStorage={filterStoreInstance.orderStorage}
      onSelect={this.changeOrderStorage}
    />
  }
}

export default observer(SelectOrderStorageContainer)
