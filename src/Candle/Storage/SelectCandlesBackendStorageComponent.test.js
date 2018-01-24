// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectCandlesBackendStorageComponent from "./SelectCandlesBackendStorageComponent"

it('renders correctly', () => {
  const onSelect = () => undefined
  const tree = renderer
    .create(
      <SelectCandlesBackendStorageComponent
        availableStorages={{foo: {key: 'foo', title: 'Foo'}}}
        defaultSelectedPair="foo"
        onSelect={onSelect}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
