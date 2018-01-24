// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectPairComponent from "./SelectPairComponent"

it('renders correctly', () => {
  const tree = renderer
    .create(
      <SelectPairComponent
        availablePairs={{foo: {key: 'foo', title: 'Foo'}}}
        defaultSelectedPair="foo"
        onSelect={() => undefined}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
