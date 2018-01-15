// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectCandlesBackendStorageComponent from "../Candle/Storage/SelectCandlesBackendStorageComponent"
import {candleStorageStoreInstance} from "../Candle/Storage/CandleStorageStore"

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
