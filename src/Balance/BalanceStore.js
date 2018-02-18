// @flow
import {action, extendObservable} from "mobx"
import type {BalanceSocket} from "./BalanceSocket"
import {Balance} from "./Balance"
import {FilterStore} from "../TopFilter/FilterStore"

class BalanceStore {
  balances: Array<Balance>
  balancesSocket: BalanceSocket

  constructor(balancesSocket: BalanceSocket) {
    this.balancesSocket = balancesSocket

    extendObservable(this, {
      balances: [],
    })
  }

  processBalances = action((balances: Array<Balance>): void => {
    this.balances = balances
  })

  reloadData = action((marketPluginName: string, marketName: string): void => {
    this.balancesSocket.loadBalances(marketPluginName, marketName, this.processBalances)
  })

  reloadDataByFilter = action((filterStoreInstance: FilterStore): void => {
    if (filterStoreInstance.canLoadBalances()) {
      this.balancesSocket.loadBalances(
        filterStoreInstance.marketPlugin,
        filterStoreInstance.market,
        this.processBalances)
    }
  })

}

export {
  BalanceStore,
}
