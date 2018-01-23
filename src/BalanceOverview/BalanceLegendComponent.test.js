// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import BalanceLegendComponent from "./BalanceLegendComponent"

it('renders correctly', () => {
  const tree = renderer.create(<BalanceLegendComponent/>).toJSON()
  expect(tree).toMatchSnapshot()
})
