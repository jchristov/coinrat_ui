// @flow
import {extendObservable} from "mobx"

const TYPE_STRING = 'string'
const TYPE_INTEGER = 'int'
const TYPE_DECIMAL = 'Decimal'

const POSSIBLE_TYPES = TYPE_STRING | TYPE_INTEGER | TYPE_DECIMAL

const MOCKED_MARKET_NAME_FIELD = 'mocked_market_name'
const MOCKED_BASE_CURRENCY_FIELD = 'mocked_base_currency'

class ConfigurationDirective {
  key: string
  type: POSSIBLE_TYPES
  title: string
  _value: string | number
  defaultValue: string | number
  unit: ?string
  isRequired: boolean
  isDisabled: boolean
  description: ?string

  constructor(
    key: string,
    type: POSSIBLE_TYPES,
    title: string,
    defaultValue: string | number,
    unit: ?string,
    isRequired: boolean,
    isDisabled: boolean,
    description: ?string
  ) {
    this.key = key
    this.type = type
    this.title = title
    this.description = description

    extendObservable(this, {
      _value: defaultValue
    })

    this.defaultValue = defaultValue
    this.unit = unit
    this.isRequired = isRequired
    this.isDisabled = isDisabled
  }

  set value(value) {
    if (this.type === TYPE_INTEGER) {
      value = Number(value)
    }
    this._value = value
  }

  get value() {
    return this._value
  }

  resetToDefault = () => {
    this._value = this.defaultValue
  }
}

class ConfigurationStructure {
  configuration: Array<ConfigurationDirective>

  constructor(configuration: Array<ConfigurationDirective> = []) {
    extendObservable(this, {
      configuration: configuration,
    })
  }
}

function isDisabledByFieldName(key: string): boolean {
  return [MOCKED_MARKET_NAME_FIELD, MOCKED_BASE_CURRENCY_FIELD].includes(key)
}

const createConfigurationStructureFromRawData = (data: Object): ConfigurationStructure => {
  const configuration = Object.keys(data).map((key: string) => {
    const rawDirective = data[key]

    return new ConfigurationDirective(
      key,
      rawDirective.type.replace('?', ''),
      rawDirective.title,
      rawDirective.default,
      rawDirective.unit || null,
      !rawDirective.type.startsWith('?'),
      isDisabledByFieldName(key),
      rawDirective.description || '',
    )
  })

  return new ConfigurationStructure(configuration)
}

export {
  MOCKED_MARKET_NAME_FIELD,
  MOCKED_BASE_CURRENCY_FIELD,

  ConfigurationStructure,
  ConfigurationDirective,
  createConfigurationStructureFromRawData,

  POSSIBLE_TYPES,
  TYPE_STRING,
  TYPE_INTEGER,
  TYPE_DECIMAL,
}
