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
      if (marketStoreInstance.hasAnyMarket()) {
        const market = marketStoreInstance.getFirstMarket()
        filterStoreInstance.changeMarket(market.name)
        pairStoreInstance.reloadData(market.name, marketPlugin, () => {
          if (pairStoreInstance.hasAnyPair()) {
            const pair = pairStoreInstance.getFirstPair()
            filterStoreInstance.changePair(pair.key)
          }
        })
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
