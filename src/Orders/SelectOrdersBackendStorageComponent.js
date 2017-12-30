import React, {Component} from "react"
import {observer} from "mobx-react/index"
import SelectComponent from "../SelectComponent"

const SelectOrderBackendStorageComponent = observer(class SelectPairComponent extends Component {

  handleValueChange = (orderStorage) => this.props.store.changeSelectedOrderStorage(orderStorage.key)

  render() {
    const orderBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    const item = orderBackendStorages[this.props.store.selectedOrderStorage]

    return <SelectComponent
      label="Order storage"
      items={orderBackendStorages}
      selectedItem={item}
      onChange={this.handleValueChange}
    />
  }
})

export default SelectOrderBackendStorageComponent
