// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import NumberComponent from "./NumberComponent"

it('renders correctly - uncolored', () => {
  const tree = renderer
    .create(<NumberComponent number={1.24}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly - colored - positive', () => {
  const tree = renderer
    .create(<NumberComponent number={1.24} colored/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly - colored - negative', () => {
  const tree = renderer
    .create(<NumberComponent number={-1.24} colored/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
