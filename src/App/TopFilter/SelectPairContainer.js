// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {
  filterStoreInstance,
  pairStoreInstance,
  mainChartStoreInstance,
  marketStoreInstance,
  candleStoreInstance,
  orderStoreInstance,
} from "../diContainer"
import {MOCKED_BASE_CURRENCY_FIELD} from "../../ConfigurationStructure/ConfigurationStructure"
import SelectPairComponent from "../../Pair/SelectPairComponent"
import {MOCK_MARKET_PLUGIN_NAME} from "../../MarketPlugin/MarketPlugin"

class SelectPairContainer extends Component<{}> {

  componentDidMount() {
    pairStoreInstance.reloadData(filterStoreInstance.market, filterStoreInstance.marketPlugin, () => undefined)
  }

  changePair = (pair: string) => {
    filterStoreInstance.changePair(pair)
    marketStoreInstance.changeMarketConfigurationField(
      MOCK_MARKET_PLUGIN_NAME,
      filterStoreInstance.market,
      MOCKED_BASE_CURRENCY_FIELD,
      pair.split('_')[0]
    )

    if (filterStoreInstance.canLoadCandles()) {
      candleStoreInstance.reloadByFilter(filterStoreInstance, mainChartStoreInstance.candleSize)
    }

    if (filterStoreInstance.canLoadOrders()) {
      orderStoreInstance.reloadByFilter(filterStoreInstance)
    }
  }

  render = () => {
    return <SelectPairComponent
      availablePairs={pairStoreInstance.pairs}
      defaultSelectedPair={filterStoreInstance.pair}
      onSelect={this.changePair}
    />
  }
}

export default observer(SelectPairContainer)
