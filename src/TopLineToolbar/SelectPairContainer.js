// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {candleStoreInstance} from "../Candle/CandleStore"
import {orderStoreInstance} from "../Orders/OrderStore"
import {pairStoreInstance} from "../Pair/PairStore"

class SelectPairContainer extends Component<{}> {

  componentDidMount() {
    pairStoreInstance.reloadData(filterStoreInstance.market)
  }

  changePair = (pair: string) => {
    filterStoreInstance.changePair(pair)
    orderStoreInstance.reloadByFilter(filterStoreInstance)
    candleStoreInstance.reloadByFilter(filterStoreInstance)
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
