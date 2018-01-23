// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import HelpIconComponent from "./HelpIconComponent"

it('renders correctly', () => {
  const tree = renderer.create(<HelpIconComponent helpText="Trololoooooo"/>).toJSON()
  expect(tree).toMatchSnapshot()
})
