// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectStrategyComponent from "./SelectStrategyComponent"

it('renders correctly', () => {
  const tree = renderer
    .create(
      <SelectStrategyComponent
        availableStrategies={{foo: {key: 'foo', title: 'Foo'}}}
        defaultSelectedStrategy="foo"
        onSelect={() => undefined}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
