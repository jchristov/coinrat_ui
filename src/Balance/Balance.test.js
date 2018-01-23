// @flow
import {Balance} from "./Balance"

it('test constructor', () => {
  const balance = new Balance('USD', '1324')
  expect(balance.currency).toBe('USD')
  expect(balance.availableAmount).toBe('1324')
})
