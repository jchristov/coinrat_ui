// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import RunStrategyButtonComponent from "./RunStrategyButtonComponent"

it('renders correctly', () => {
  const tree = renderer.create(<RunStrategyButtonComponent onClick={() => undefined}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
