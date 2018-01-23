// @flow

import {BalanceStore} from "./BalanceStore"
import {Balance} from "./Balance"

it('store processed balances', () => {
  const store = new BalanceStore()
  expect(store.balances.length).toBe(0)
  const usdBalance = new Balance('USD', '1234')
  store.processBalances([usdBalance])
  expect(store.balances.length).toBe(1)
  expect(store.balances[0]).toBe(usdBalance)
})
