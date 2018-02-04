// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance, marketStoreInstance, pairStoreInstance} from "../diContainer"
import {Market, MOCK_MARKET_NAME} from "../../Market/Market"
import {MOCKED_MARKET_NAME_FIELD} from "../../ConfigurationStructure/ConfigurationStructure"
import SelectMarketComponent from "../../Market/SelectMarketComponent"

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
    marketStoreInstance.changeMarketConfigurationField(MOCK_MARKET_NAME, MOCKED_MARKET_NAME_FIELD, marketName)
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
      isLoading={this.state.isLoading}
    />
  }
}

export default observer(SelectMarketContainer)
