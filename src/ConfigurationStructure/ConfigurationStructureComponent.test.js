// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import ConfigurationStructureComponent from "./ConfigurationStructureComponent"
import {ConfigurationDirective, ConfigurationStructure, TYPE_INTEGER} from "./ConfigurationStructure"

it.skip('renders correctly', () => {
  global.document = {} // Todo: solve ReferenceError: document is not defined

  const configurationStructure = new ConfigurationStructure([
    new ConfigurationDirective('foo', TYPE_INTEGER, 'Foo', 1, 'lumen', true, false, 'This  is Foo!'),
  ])

  const tree = renderer
    .create(
      <ConfigurationStructureComponent
        tooltip={"Here is some tooltip!"}
        noConfigurationDescription={"Lorem ipsum dolor sit et amet!"}
        configurationStructure={configurationStructure}
        onChange={() => undefined}
        onReset={() => undefined}
      />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
