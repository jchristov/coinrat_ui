// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import {filterStoreInstance, marketStoreInstance} from "../diContainer"
import {Market} from "../../Market/Market"
import ConfigurationStructureComponent from "../../ConfigurationStructure/ConfigurationStructureComponent"
import {MOCK_MARKET_PLUGIN_NAME} from "../../MarketPlugin/MarketPlugin"

class MarketConfigurationContainer extends Component<{}> {

  handleOnChange = (e) => {
    marketStoreInstance.changeMarketConfigurationField(
      MOCK_MARKET_PLUGIN_NAME,
      filterStoreInstance.market,
      e.target.name,
      e.target.value
    )
  }

  handleReset = () => {
    marketStoreInstance.resetConfigurationValuesToDefault(MOCK_MARKET_PLUGIN_NAME, filterStoreInstance.market)
  }

  render = () => {
    const market: Market = marketStoreInstance.get(MOCK_MARKET_PLUGIN_NAME, filterStoreInstance.market)
    if (market === undefined) {
      return null
    }

    return <ConfigurationStructureComponent
      tooltip="You can change settings of a market."
      noConfigurationDescription="If you want to change some property of the market, you need to adjust implementation in plugin in order to allow configuration."
      configurationStructure={market.configurationStructure}
      onChange={this.handleOnChange}
      onReset={this.handleReset}
    />
  }
}

export default observer(MarketConfigurationContainer)
