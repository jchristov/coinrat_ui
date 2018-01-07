// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectMarketComponent from "../Market/SelectMarketComponent"

class SelectMarketContainer extends Component<{}> {

  changeMarket = (market: string) => {
    filterStoreInstance.changeMarket(market)
  }

  render = () => {
    const markets = {
      'bittrex': {key: 'bittrex', title: 'Bittrex'},
      'bitfinex': {key: 'bitfinex', title: 'Bitfinex'},
    }

    return <SelectMarketComponent
      availableMarkets={markets}
      defaultSelectedMarket={filterStoreInstance.market}
      onSelect={this.changeMarket}
    />
  }
}

export default observer(SelectMarketContainer)
