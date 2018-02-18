// @flow
import React, {Component} from 'react'
import {balanceStoreInstance, filterStoreInstance} from '../../diContainer'
import BalanceTableContainer from "./BalanceTableContainer"
import TopLineAllToolbarContainer from "../../TopFilter/TopLineAllToolbarContainer"

type Props = {
  market: string,
  marketPlugin: string,
}

class BalancesOverviewComponent extends Component<Props> {

  componentDidMount() {
    balanceStoreInstance.reloadDataByFilter(filterStoreInstance)
  }

  componentWillReceiveProps(nextProps: Props) {
    const current = this.props

    if (current.marketPlugin !== nextProps.marketPlugin || current.market !== nextProps.market) {
      balanceStoreInstance.reloadDataByFilter(filterStoreInstance)
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
      isStrategyRunSelectorEnabled: false,
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
