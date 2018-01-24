// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import StatusIndicatorComponent from "./StatusIndicatorComponent"

it('renders correctly, ONLINE', () => {
  const tree = renderer.create(<StatusIndicatorComponent isOnline={true}/>).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly, OFFLINE', () => {
  const tree = renderer.create(<StatusIndicatorComponent isOnline={false}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
