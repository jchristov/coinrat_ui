import React, {Component} from "react"
import {observer} from "mobx-react/index"
import SelectComponent from "../SelectComponent"

const SelectCandlesBackendStorageComponent = observer(class SelectPairComponent extends Component {

  handleValueChange = (candleStorage) => this.props.store.changeSelectedCandleStorage(candleStorage.key)

  render() {
    const candleBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    const item = candleBackendStorages[this.props.store.selectedCandleStorage]

    return <SelectComponent
      label="Candle storage"
      items={candleBackendStorages}
      selectedItem={item}
      onChange={this.handleValueChange}
    />
  }
})

export default SelectCandlesBackendStorageComponent
