// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./FilterStore"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import {orderStoreInstance} from "../Orders/OrderStore"
import {candleStoreInstance} from "../Candle/CandleStore"

class SelectMarketContainer extends Component<{}> {

  changeMarket = (market: string) => {
    filterStoreInstance.changeMarket(market)
    orderStoreInstance.reloadByFilter(filterStoreInstance)
    candleStoreInstance.reloadByFilter(filterStoreInstance)
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
