// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectStrategyRunComponent from "./SelectStrategyRunComponent"

it('renders correctly', () => {
  const onSelect = () => undefined
  const tree = renderer
    .create(
      <SelectStrategyRunComponent
        availableStrategyRuns={{foo: {key: 'foo', title: 'Foo'}}}
        defaultSelectedStrategyRun="foo"
        onSelect={onSelect}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
