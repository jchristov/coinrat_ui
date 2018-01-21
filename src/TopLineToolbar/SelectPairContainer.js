// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {candleStoreInstance} from "../Candle/CandleStore"
import {orderStoreInstance} from "../Orders/OrderStore"
import {pairStoreInstance} from "../Pair/PairStore"
import {MOCKED_BASE_CURRENCY_FIELD} from "../ConfigurationStructure/ConfigurationStructure"
import {MOCK_MARKET_NAME} from "../Market/Market"
import {marketStoreInstance} from "../Market/MarketStore"
import {candleSizeStoreInstance} from "../Candle/CandleSize/CandleSizeStore"

class SelectPairContainer extends Component<{}> {

  componentDidMount() {
    pairStoreInstance.reloadData(filterStoreInstance.market)
  }

  changePair = (pair: string) => {
    filterStoreInstance.changePair(pair)
    orderStoreInstance.reloadByFilter(filterStoreInstance)
    candleStoreInstance.reloadByFilter(filterStoreInstance, candleSizeStoreInstance.candleSize)
    marketStoreInstance.changeMarketConfigurationField(MOCK_MARKET_NAME, MOCKED_BASE_CURRENCY_FIELD, pair.split('_')[0])
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
