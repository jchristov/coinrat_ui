// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {
  filterStoreInstance,
  marketPluginStoreInstance,
  marketStoreInstance, pairStoreInstance, simulationModeStoreInstance,
} from "../diContainer"
import SelectMarketPluginComponent from "../../MarketPlugin/MarketPluginComponent"
import {MOCK_MARKET_PLUGIN_NAME} from "../../MarketPlugin/MarketPlugin"

class SelectMarketPluginContainer extends Component<{}> {

  componentDidMount() {
    marketPluginStoreInstance.reloadData(() => {
      if (marketPluginStoreInstance.hasAnyMarketPlugin()) {
        const marketPlugin = marketPluginStoreInstance.getFirstMarketPluginName()
        this.changeMarketPlugin(marketPlugin)
      }
    })
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
      if (marketPlugin !== MOCK_MARKET_PLUGIN_NAME) {
        marketStoreInstance.reloadData(MOCK_MARKET_PLUGIN_NAME, () => undefined)
      }
    })
  }

  render = () => {
    return <SelectMarketPluginComponent
      availableMarketPlugins={marketPluginStoreInstance.marketPlugins}
      defaultSelectedMarketPlugin={filterStoreInstance.marketPlugin}
      onSelect={this.changeMarketPlugin}
      disabled={simulationModeStoreInstance.isSimulationModeEnabled}
    />
  }
}

export default observer(SelectMarketPluginContainer)
