// @flow
import {Market} from "./Market"
import {
  ConfigurationDirective, ConfigurationStructure,
  TYPE_STRING
} from "../ConfigurationStructure/ConfigurationStructure"

const _createDummyMarket = (): Market => {
  const config = new ConfigurationStructure([
    new ConfigurationDirective('aaa', TYPE_STRING, 'AAA', 'This is DEFAULT!', 'A\'s', true, false, 'Lorem Ipsum')
  ])
  return new Market('market_foo', 'YOLO Market', config)
}

it('test market constructor', () => {
  const market = _createDummyMarket()
  expect(market.name).toBe('market_foo')
  expect(market.title).toBe('YOLO Market')
  expect(market.configurationStructure.configuration.length).toBe(1)
  expect(market.configurationStructure.configuration[0].value).toBe('This is DEFAULT!')
})

it('Markets configuration can be changed and set back to default', () => {
  const market = _createDummyMarket()
  market.setConfigurationField('aaa', 'Tralala')
  expect(market.configurationStructure.configuration[0].value).toBe('Tralala')
  market.resetConfigurationToDefault('aaa', 'This is DEFAULT!')
})
