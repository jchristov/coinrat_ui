// @flow
import {Strategy} from "./Strategy"
import {
  ConfigurationDirective, ConfigurationStructure,
  TYPE_STRING
} from "../ConfigurationStructure/ConfigurationStructure"

const _createDummyStrategy = (): Strategy => {
  const config = new ConfigurationStructure([
    new ConfigurationDirective('aaa', TYPE_STRING, 'AAA', 'This is DEFAULT!', 'A\'s', true, false, 'Lorem Ipsum')
  ])
  return new Strategy('strategy_foo', 'YOLO Strategy', config)
}

it('test strategy constructor', () => {
  const strategy = _createDummyStrategy()
  expect(strategy.name).toBe('strategy_foo')
  expect(strategy.title).toBe('YOLO Strategy')
  expect(strategy.configurationStructure.configuration.length).toBe(1)
  expect(strategy.configurationStructure.configuration[0].value).toBe('This is DEFAULT!')
})

it('Strategys configuration can be changed and set back to default', () => {
  const strategy = _createDummyStrategy()
  strategy.setConfigurationField('aaa', 'Tralala')
  expect(strategy.configurationStructure.configuration[0].value).toBe('Tralala')
  strategy.resetConfigurationToDefault('aaa', 'This is DEFAULT!')
})
