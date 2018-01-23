// @flow
import React, {Component} from 'react'
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {balanceStoreInstance} from "../Balance/BalanceStore"
import BalanceTableContainer from "./BalanceTableContainer"
import TopLineAllToolbarContainer from "../TopLineToolbar/TopLineAllToolbarContainer"

type Props = {
  market: string,
}

class BalancesOverviewComponent extends Component<Props> {

  componentDidMount() {
    balanceStoreInstance.reloadData(filterStoreInstance.market)
  }

  componentWillReceiveProps(nextProps: Props) {
    const current = this.props

    if (current.market !== nextProps.market) {
      balanceStoreInstance.reloadData(filterStoreInstance.market)
    }
  }

  render = () => {
    const toolbarProps = {
      isPairSelectorEnabled: false,
      isMarketSelectorEnabled: true,
      isMarketConfiguratorEnabled: false,
      isCandleStorageSelectorEnabled: false,
      isOrderStorageSelectorEnabled: false,
      isOrderClearButtonEnabled: false,
      isIntervalSelectorEnabled: false,
      isStrategySelectorEnabled: false,
      isStrategyConfiguratorEnabled: false,
      isRunStrategyButtonEnabled: false,
    }

    return <div>
      <TopLineAllToolbarContainer {...toolbarProps}/>
      <BalanceTableContainer/>
    </div>
  }
}

export default BalancesOverviewComponent
