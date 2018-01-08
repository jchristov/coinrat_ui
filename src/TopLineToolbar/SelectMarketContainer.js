// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import {marketStoreInstance} from "../Market/MarketStore"

class SelectMarketContainer extends Component<{}> {

  componentDidMount() {
    marketStoreInstance.reloadData()
  }

  changeMarket = (market: string) => {
    filterStoreInstance.changeMarket(market)
  }

  render = () => {
    console.log(marketStoreInstance.markets)

    return <SelectMarketComponent
      availableMarkets={marketStoreInstance.markets}
      defaultSelectedMarket={filterStoreInstance.market}
      onSelect={this.changeMarket}
    />
  }
}

export default observer(SelectMarketContainer)
