// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance, orderStorageStoreInstance} from "../diContainer"
import SelectOrdersBackendStorageComponent from "../../Orders/Storage/SelectOrdersBackendStorageComponent"

class SelectOrderStorageContainer extends Component<{}> {

  componentDidMount() {
    orderStorageStoreInstance.reloadData(() => {
      if (filterStoreInstance.orderStorage === null) {
        const availableStorages = Object.values(orderStorageStoreInstance.orderStorages)
        filterStoreInstance.changeOrderStorage(availableStorages[0].key)
      }
    })
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
