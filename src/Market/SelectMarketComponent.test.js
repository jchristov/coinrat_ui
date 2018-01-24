// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectMarketComponent from "./SelectMarketComponent"

it('renders correctly', () => {
  const onSelect = () => undefined
  const tree = renderer
    .create(
      <SelectMarketComponent
        availableMarkets={{foo: {key: 'foo', title: 'Foo'}}}
        defaultSelectedMarket="foo"
        onSelect={onSelect}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
