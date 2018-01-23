// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import ColoredDotComponent from "./ColoredDotComponent"

it('renders correctly', () => {
  const tree = renderer
    .create(<ColoredDotComponent color="red"/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
