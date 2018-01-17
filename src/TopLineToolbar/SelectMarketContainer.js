// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import {marketStoreInstance} from "../Market/MarketStore"
import {pairStoreInstance} from "../Pair/PairStore"
import {Market, MOCK_MARKET_NAME} from "../Market/Market"

class SelectMarketContainer extends Component<{}> {

  componentDidMount() {
    marketStoreInstance.reloadData()
  }

  changeMarket = (market: string) => {
    filterStoreInstance.changeMarket(market)
    pairStoreInstance.reloadData(market)
  }

  static getItemsForMarketSelectBox() {
    let availableMarkets = marketStoreInstance.markets.toJS()

    for (let key in availableMarkets) {
      if (availableMarkets.hasOwnProperty(key)) {
        const market: Market = availableMarkets[key]
        availableMarkets[key] = {key: market.name, title: market.title}
      }

      if (key === MOCK_MARKET_NAME) {
        delete availableMarkets[key]
      }
    }

    return availableMarkets
  }

  render = () => {
    return <SelectMarketComponent
      availableMarkets={SelectMarketContainer.getItemsForMarketSelectBox()}
      defaultSelectedMarket={filterStoreInstance.market}
      onSelect={this.changeMarket}
    />
  }
}

export default observer(SelectMarketContainer)
