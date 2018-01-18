// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import BalanceTableComponent from "../Balance/BalanceTableComponent"
import {balanceStoreInstance} from "../Balance/BalanceStore"

class BalanceTableContainer extends Component<{}> {

  render = () => {
    return <BalanceTableComponent balances={balanceStoreInstance.balances.slice()}/>
  }
}

export default observer(BalanceTableContainer)
