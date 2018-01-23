// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import SelectCandlesBackendStorageComponent from "./SelectCandlesBackendStorageComponent"

it.skip('renders correctly', () => {
  const onSelect = () => undefined
  global.document = {} // Todo: solve ReferenceError: document is not defined
  const tree = renderer
    .create(
      <SelectCandlesBackendStorageComponent
        availableStorages={[{foo: 'Foo'}]}
        defaultSelectedPair="foo"
        onSelect={onSelect}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
