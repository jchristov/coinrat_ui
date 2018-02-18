// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance, marketStoreInstance, pairStoreInstance} from "../diContainer"
import {Market} from "../../Market/Market"
import {MOCKED_MARKET_NAME_FIELD} from "../../ConfigurationStructure/ConfigurationStructure"
import SelectMarketComponent from "../../Market/SelectMarketComponent"
import {MOCK_MARKET_PLUGIN_NAME} from "../../MarketPlugin/MarketPlugin"

class SelectMarketContainer extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {isLoading: true}
  }

  componentDidMount() {
    marketStoreInstance.reloadData(filterStoreInstance.marketPlugin, () => {
      this.setState({isLoading: false})
    })
  }

  changeMarket = (marketName: string) => {
    filterStoreInstance.changeMarket(marketName)
    pairStoreInstance.reloadData(marketName, filterStoreInstance.marketPlugin, () => undefined)
    marketStoreInstance.changeMarketConfigurationField(
      MOCK_MARKET_PLUGIN_NAME,
      marketName,
      MOCKED_MARKET_NAME_FIELD,
      marketName
    )
  }

  static getItemsForMarketSelectBox() {
    let availableMarkets = marketStoreInstance.markets.toJS()

    let result = {}
    for (let key in availableMarkets) {
      if (key.startsWith(filterStoreInstance.marketPlugin) && availableMarkets.hasOwnProperty(key)) {
        const market: Market = availableMarkets[key]
        result[market.name] = {key: market.name, title: market.title}
      }
    }

    return result
  }

  render = () => {
    return <SelectMarketComponent
      availableMarkets={SelectMarketContainer.getItemsForMarketSelectBox()}
      defaultSelectedMarket={filterStoreInstance.market}
      onSelect={this.changeMarket}
      isLoading={this.state.isLoading}
    />
  }
}

export default observer(SelectMarketContainer)
