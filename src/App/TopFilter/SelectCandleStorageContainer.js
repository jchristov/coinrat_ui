// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {candleStorageStoreInstance, filterStoreInstance} from "../diContainer"
import SelectCandlesBackendStorageComponent from "../../Candle/Storage/SelectCandlesBackendStorageComponent"

class SelectCandleStorageContainer extends Component<{}> {

  componentDidMount() {
    candleStorageStoreInstance.reloadData()
  }

  changeCandleStorage = (candleStorage: string) => {
    filterStoreInstance.changeCandleStorage(candleStorage)
  }

  render = () => {
    return <SelectCandlesBackendStorageComponent
      availableStorages={candleStorageStoreInstance.candleStorages}
      defaultSelectedCandleStorage={filterStoreInstance.candleStorage}
      onSelect={this.changeCandleStorage}
    />
  }

}

export default observer(SelectCandleStorageContainer)
