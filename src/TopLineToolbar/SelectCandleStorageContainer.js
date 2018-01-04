// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectCandlesBackendStorageComponent from "../Candle/SelectCandlesBackendStorageComponent"
import {candleStoreInstance} from "../Candle/CandleStore"

class SelectCandleStorageContainer extends Component<{}> {

  changeCandleStorage = (candleStorage: string) => {
    filterStoreInstance.changeCandleStorage(candleStorage)
    candleStoreInstance.reloadByFilter(filterStoreInstance)
  }

  render = () => {
    const candleBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    return <SelectCandlesBackendStorageComponent
      availableStorages={candleBackendStorages}
      defaultSelectedCandleStorage={filterStoreInstance.candleStorage}
      onSelect={this.changeCandleStorage}
    />
  }

}

export default observer(SelectCandleStorageContainer)
