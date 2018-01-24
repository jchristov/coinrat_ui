// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectOrdersBackendStorageComponent from "./SelectOrdersBackendStorageComponent"

it('renders correctly', () => {
  const tree = renderer
    .create(
      <SelectOrdersBackendStorageComponent
        availableStorages={{foo: {key: 'foo', title: 'Foo'}}}
        defaultSelectedPair="foo"
        onSelect={() => undefined}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
