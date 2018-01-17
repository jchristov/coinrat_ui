import {extendObservable} from "mobx"

const TYPE_STRING = 'string'
const TYPE_INTEGER = 'int'
const TYPE_DECIMAL = 'Decimal'

const POSSIBLE_TYPES = TYPE_STRING | TYPE_INTEGER | TYPE_DECIMAL

class ConfigurationDirective {
  key: string
  type: POSSIBLE_TYPES
  title: string
  _value: string | number
  defaultValue: string | number
  unit: ?string
  isRequired: boolean
  isDisabled: boolean

  constructor(
    key: string,
    type: POSSIBLE_TYPES,
    title: string,
    defaultValue: string | number,
    unit: ?string,
    isRequired: boolean,
    isDisabled: boolean
  ) {
    this.key = key
    this.type = type
    this.title = title

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

  constructor(configuration: Array<ConfigurationDirective>) {
    extendObservable(this, {
      configuration: configuration,
    })
  }
}

function isDisabledByFieldName(key: string): boolean {
  return ['mocked_market_name'].includes(key)
}

const createConfigurationStructureFromRawData = (data) => {
  const configuration = Object.keys(data).map((key: string) => {
    const rawDirective = data[key]

    return new ConfigurationDirective(
      key,
      rawDirective.type.replace('?', ''),
      rawDirective.title,
      rawDirective.default,
      rawDirective.unit || null,
      !rawDirective.type.startsWith('?'),
      isDisabledByFieldName(key)
    )
  })

  return new ConfigurationStructure(configuration)
}

export {
  ConfigurationStructure,
  ConfigurationDirective,
  createConfigurationStructureFromRawData,
  POSSIBLE_TYPES,
  TYPE_STRING,
  TYPE_INTEGER,
  TYPE_DECIMAL,
}
