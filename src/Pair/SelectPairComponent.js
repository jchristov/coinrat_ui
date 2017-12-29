import React, {Component} from "react"
import {observer} from "mobx-react/index"
import SelectComponent from "../SelectComponent"

const SelectPairComponent = observer(class SelectPairComponent extends Component {

  handleValueChange = (pair) => this.props.store.changeSelectedPair(pair.key)

  render() {
    const pairs = {
      'USD_BTC': {key: 'USD_BTC', title: 'USD-BTC'},
      'USD_LTC': {key: 'USD_LTC', title: 'USD-LTC'},
      'USD_ETH': {key: 'USD_ETH', title: 'USD-ETH'},
    }

    const item = pairs[this.props.store.selectedPair]

    return <SelectComponent label="Pair" items={pairs} selectedItem={item} onChange={this.handleValueChange}/>
  }
})

export default SelectPairComponent
