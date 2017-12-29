import React, {Component} from "react"
import {observer} from "mobx-react/index"
import SelectComponent from "../SelectComponent"

const SelectMarketComponent = observer(class SelectMarketComponent extends Component {

  handleValueChange = (pair) => this.props.store.changeSelectedMarket(pair.key)

  render() {
    const markets = {
      'bittrex': {key: 'bittrex', title: 'Bittrex'},
      'bitfinex': {key: 'bitfinex', title: 'Bitfinex'},
    }

    const item = markets[this.props.store.selectedMarket]

    return <SelectComponent label="Pair" items={markets} selectedItem={item} onChange={this.handleValueChange}/>
  }
})

export default SelectMarketComponent
