// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import ResetStrategyRunButtonComponent from "./ResetStrategyRunButtonComponent"

it('renders correctly', () => {
  const tree = renderer.create(<ResetStrategyRunButtonComponent onClick={() => undefined}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
