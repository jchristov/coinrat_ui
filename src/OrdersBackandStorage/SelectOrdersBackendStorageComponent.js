import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button} from "@blueprintjs/core/dist/components/button/buttons"
import {MenuItem} from "@blueprintjs/core/dist/components/menu/menuItem"
import * as Classes from "@blueprintjs/core/dist/common/classes"
import {observer} from "mobx-react/index"

const OrdersBackendStorageSelect = Select.ofType()

const SelectOrdersBackendStorageComponent = observer(class SelectPairComponent extends Component {
  renderPair({handleClick, isActive, item}) {
    return (
      <MenuItem
        className={Classes.ACTIVE}
        key={item.key}
        onClick={handleClick}
        text={item.title}
      />
    )
  }

  filterPair(query, orderBackendStorage, index) {
    return `${index + 1}. ${orderBackendStorage.title.toLowerCase()} ${orderBackendStorage.year}`.indexOf(query.toLowerCase()) >= 0
  }

  handleValueChange = (orderBackendStorage) => this.props.store.changeSelectedOrderStorage(orderBackendStorage.key)

  render() {
    const selectedPair = this.props.store.selectedOrderStorage

    const orderBackendStorages = {
      'influx_db': {key: 'influx_db', title: 'Influx DB'},
      'memory': {key: 'memory', title: 'In memory'},
    }

    const item = orderBackendStorages[selectedPair]

    return (
      <OrdersBackendStorageSelect
        items={Object.values(orderBackendStorages)}
        itemPredicate={this.filterPair}
        itemRenderer={this.renderPair}
        noResults={<MenuItem disabled text="No results."/>}
        onItemSelect={this.handleValueChange}
      >
        <Button rightIconName="caret-down" text={`Orders storage: ${item.title}`}/>
      </OrdersBackendStorageSelect>
    )
  }
})

export default SelectOrdersBackendStorageComponent
