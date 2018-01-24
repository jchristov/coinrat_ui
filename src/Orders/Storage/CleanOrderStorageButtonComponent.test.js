// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import CleanOrderStorageButtonComponent from "./CleanOrderStorageButtonComponent"

it('renders correctly', () => {
  const tree = renderer.create(<CleanOrderStorageButtonComponent onClick={() => undefined}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
