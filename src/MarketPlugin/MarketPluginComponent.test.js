// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectMarketPluginComponent from "./MarketPluginComponent"

it('renders correctly', () => {
  const tree = renderer
    .create(
      <SelectMarketPluginComponent
        availableMarketPlugins={{foo: {key: 'foo', title: 'Foo'}}}
        defaultSelectedMarketPlugin="foo"
        onSelect={() => undefined}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
