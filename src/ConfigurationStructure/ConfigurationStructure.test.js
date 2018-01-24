// @flow

import {
  ConfigurationDirective, ConfigurationStructure, createConfigurationStructureFromRawData,
  TYPE_INTEGER
} from "./ConfigurationStructure"

it('test constructor', () => {
  const configurationStructure = new ConfigurationStructure([
    new ConfigurationDirective('foo', TYPE_INTEGER, 'Foo', 1, 'lumen', true, false, 'This  is Foo!'),
  ])
  expect(configurationStructure.configuration.length).toBe(1)
  expect(configurationStructure.configuration[0].type).toBe(TYPE_INTEGER)
  expect(configurationStructure.configuration[0].title).toBe('Foo')
  expect(configurationStructure.configuration[0].unit).toBe('lumen')
  expect(configurationStructure.configuration[0].value).toBe(1)
  expect(configurationStructure.configuration[0].description).toBe('This  is Foo!')
  expect(configurationStructure.configuration[0].isRequired).toBe(true)
  expect(configurationStructure.configuration[0].isDisabled).toBe(false)
})

it('createConfigurationStructureFromRawData creates valid structure from raw data', () => {
  const structure = createConfigurationStructureFromRawData({
    mocked_base_currency: { // disabled - reserved name
      type: '?int',
      title: 'Yolanda',
      default: 666,
      unit: 'mag',
      description: 'Hodně někde budeš.'
    }
  })

  expect(structure.configuration.length).toBe(1)
  expect(structure.configuration[0].description).toBe('Hodně někde budeš.')
  expect(structure.configuration[0].isRequired).toBe(false)
  expect(structure.configuration[0].isDisabled).toBe(true)
  expect(structure.configuration[0].type).toBe(TYPE_INTEGER)
  expect(structure.configuration[0].type).toBe(TYPE_INTEGER)
  expect(structure.configuration[0].title).toBe('Yolanda')
  expect(structure.configuration[0].unit).toBe('mag')
  expect(structure.configuration[0].defaultValue).toBe(666)
})
