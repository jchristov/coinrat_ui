// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectIntervalComponent from "./SelectIntervalComponent"
import Interval from "./Interval"

it.skip('renders correctly', () => {
  global.document = {} // Todo: solve ReferenceError: document is not defined

  const tree = renderer
    .create(
      <SelectIntervalComponent
        defaultSelectedInterval={new Interval(new Date(2018, 1, 1, 1))}
        onChange={() => undefined}
        flashMessageHandler={() => undefined}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
