import React, {Component} from "react"
import {observer} from "mobx-react/index"
import SelectComponent from "../SelectComponent"
import {Label} from "@blueprintjs/core/dist/components/forms/label"

const SelectMarketComponent = observer(class SelectMarketComponent extends Component {

  handleValueChange = (pair) => this.props.store.changeSelectedPair(pair.key)

  render() {
    const pairs = {
      'USD_BTC': {key: 'USD_BTC', title: 'USD-BTC'},
      'USD_LTC': {key: 'USD_LTC', title: 'USD-LTC'},
      'USD_ETH': {key: 'USD_ETH', title: 'USD-ETH'},
    }

    const item = pairs[this.props.store.selectedPair]

    return <SelectComponent label="Market" items={pairs} selectedItem={item} onChange={this.handleValueChange}/>
  }
})

export default SelectMarketComponent
