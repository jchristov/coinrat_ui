// @flow
import React, {Component} from "react"
import {observer} from "mobx-react/index"
import {SelectComponent, SelectElement} from "../SelectComponent"
import {FilterStore} from "../TopLineToolbar/FilterStore"

type Props = {
  store: FilterStore,
}

const SelectMarketComponent = observer(class SelectMarketComponent extends Component<Props> {
  props: Props

  handleValueChange = (market: SelectElement) => {
    this.props.store.changeSelectedMarket(market.key)
  }

  render() {
    const markets = {
      'bittrex': {key: 'bittrex', title: 'Bittrex'},
      'bitfinex': {key: 'bitfinex', title: 'Bitfinex'},
    }

    const item = markets[this.props.store.selectedMarket]

    return <SelectComponent label="Market" items={markets} selectedItem={item} onChange={this.handleValueChange}/>
  }
})

export default SelectMarketComponent
