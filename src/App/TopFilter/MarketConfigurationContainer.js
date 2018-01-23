// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import {marketStoreInstance} from "../diContainer"
import {Market, MOCK_MARKET_NAME} from "../../Market/Market"
import ConfigurationStructureComponent from "../../ConfigurationStructure/ConfigurationStructureComponent"

class MarketConfigurationContainer extends Component<{}> {

  handleOnChange = (e) => {
    marketStoreInstance.changeMarketConfigurationField(MOCK_MARKET_NAME, e.target.name, e.target.value)
  }

  handleReset = () => {
    marketStoreInstance.resetConfigurationValuesToDefault(MOCK_MARKET_NAME)
  }

  render = () => {
    const market: Market = marketStoreInstance.markets.get(MOCK_MARKET_NAME)
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
