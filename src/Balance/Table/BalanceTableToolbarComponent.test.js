// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import BalanceTableToolbarComponent from "./BalanceTableToolbarComponent"

it('renders correctly, hide zero balances ON', () => {
  const onChangeShowZeroBalances = () => undefined
  const tree = renderer
    .create(<BalanceTableToolbarComponent hideZeroBalances={true} onChangeShowZeroBalances={onChangeShowZeroBalances}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly, hide zero balances OFF', () => {
  const onChangeShowZeroBalances = () => undefined
  const tree = renderer
    .create(<BalanceTableToolbarComponent hideZeroBalances={false} onChangeShowZeroBalances={onChangeShowZeroBalances}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
