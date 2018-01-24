// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import OrdersTableComponent from "./OrdersTableComponent"

it.skip('renders correctly', () => {
  // Todo: problem with external library => this.element.addEventListener is not a function
  const tree = renderer.create(<OrdersTableComponent orders={[]}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
