// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {candleStoreInstance} from "../Candle/CandleStore"
import {orderStoreInstance} from "../Orders/OrderStore"

class SelectPairContainer extends Component<{}> {

  changePair = (pair: string) => {
    filterStoreInstance.changePair(pair)
    orderStoreInstance.reloadByFilter(filterStoreInstance)
    candleStoreInstance.reloadByFilter(filterStoreInstance)
  }

  render = () => {
    const pairs = {
      'USD_BTC': {key: 'USD_BTC', title: 'USD-BTC'},
      'USD_LTC': {key: 'USD_LTC', title: 'USD-LTC'},
      'USD_ETH': {key: 'USD_ETH', title: 'USD-ETH'},
    }

    return <SelectPairComponent
      availablePairs={pairs}
      defaultSelectedPair={filterStoreInstance.pair}
      onSelect={this.changePair}
    />
  }
}

export default observer(SelectPairContainer)
