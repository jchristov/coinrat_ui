// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectOrdersBackendStorageComponent from "../Orders/Storage/SelectOrdersBackendStorageComponent"
import {orderStorageStoreInstance} from "../Orders/Storage/OrderStorageStore"

class SelectOrderStorageContainer extends Component<{}> {

  componentDidMount() {
    orderStorageStoreInstance.reloadData()
  }

  changeOrderStorage = (orderStorage: string) => {
    filterStoreInstance.changeOrderStorage(orderStorage)
  }

  render = () => {
    return <SelectOrdersBackendStorageComponent
      availableStorages={orderStorageStoreInstance.orderStorages}
      defaultSelectedOrderStorage={filterStoreInstance.orderStorage}
      onSelect={this.changeOrderStorage}
    />
  }
}

export default observer(SelectOrderStorageContainer)
