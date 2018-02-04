// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {
  filterStoreInstance,
  marketPluginStoreInstance,
  marketStoreInstance, pairStoreInstance,
} from "../diContainer"
import SelectMarketPluginComponent from "../../MarketPlugin/MarketPluginComponent"

class SelectMarketPluginContainer extends Component<{}> {

  componentDidMount() {
    marketPluginStoreInstance.reloadData(filterStoreInstance.market)
  }

  changeMarketPlugin = (marketPlugin: string) => {
    filterStoreInstance.changeMarketPlugin(marketPlugin)
    marketStoreInstance.reloadData(marketPlugin, () => {
      const markets = Object.values(marketStoreInstance.markets.toJS())
      if (markets.length > 0) {
        filterStoreInstance.changeMarket(markets[0].name)
        pairStoreInstance.reloadData(markets[0].name, marketPlugin)
      }
    })
  }

  render = () => {
    return <SelectMarketPluginComponent
      availableMarketPlugins={marketPluginStoreInstance.marketPlugins}
      defaultSelectedMarketPlugin={filterStoreInstance.marketPlugin}
      onSelect={this.changeMarketPlugin}
    />
  }
}

export default observer(SelectMarketPluginContainer)
