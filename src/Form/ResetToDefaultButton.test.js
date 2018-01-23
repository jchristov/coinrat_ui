// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import ResetToDefaultButton from "./ResetToDefaultButton"

it('renders correctly', () => {
  const onClick = () => undefined
  const tree = renderer
    .create(<ResetToDefaultButton onClick={onClick}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
