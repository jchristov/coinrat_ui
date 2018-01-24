// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import BalanceTableComponent from "./BalanceTableComponent"

it.skip('renders correctly', () => {
  // Todo: problem with external library => this.element.addEventListener is not a function
  const tree = renderer.create(<BalanceTableComponent balances={[]}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
