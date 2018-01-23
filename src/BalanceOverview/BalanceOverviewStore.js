import {action, extendObservable} from "mobx"

class BalanceOverviewStore {

  hideZeroBalances: boolean

  constructor(hideZeroBalances: boolean = true) {
    extendObservable(this, {
      hideZeroBalances: hideZeroBalances,
    })
  }

  setHideZeroBalances = action((hideZeroBalances: boolean) => {
    this.hideZeroBalances = hideZeroBalances
  })
}


export {
  BalanceOverviewStore,
}
