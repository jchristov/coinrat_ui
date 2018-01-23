// @flow
import {BalanceOverviewStore} from "./BalanceOverviewStore"

it('store processed balances', () => {
  const store = new BalanceOverviewStore(false)
  expect(store.hideZeroBalances).toBe(false)
  store.setHideZeroBalances(true)
  expect(store.hideZeroBalances).toBe(true)
})
