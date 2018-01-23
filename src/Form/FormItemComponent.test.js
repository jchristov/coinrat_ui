// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import FormItemComponent from "./FormItemComponent"

it('renders correctly', () => {
  const tree = renderer
    .create(<FormItemComponent
      element={<input/>}
      label="Yolo label"
      labelSize={105}
      suffix="snuff-fix"
      description="Lorem impsum, dolor sit et amet..."
    />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
