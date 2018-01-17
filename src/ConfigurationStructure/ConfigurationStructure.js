import {extendObservable} from "mobx"

const TYPE_STRING = 'string'
const TYPE_INTEGER = 'int'
const TYPE_DECIMAL = 'Decimal'

const POSSIBLE_TYPES = TYPE_STRING | TYPE_INTEGER | TYPE_DECIMAL

class ConfigurationDirective {
  key: string
  type: POSSIBLE_TYPES
  title: string
  value: string | number
  defaultValue: string | number
  isRequired: boolean
  unit: ?string

  constructor(
    key: string,
    type: POSSIBLE_TYPES,
    title: string,
    defaultValue: string | number,
    unit: ?string,
    isRequired: boolean
  ) {
    this.key = key
    this.type = type
    this.title = title

    extendObservable(this, {
      value: defaultValue,
    })

    this.defaultValue = defaultValue
    this.unit = unit
    this.isRequired = isRequired
  }

  resetToDefault = () => {
    this.value = this.defaultValue
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

const createConfigurationStructureFromRawData = (data) => {
  const configuration = Object.keys(data).map((key: string) => {
    const rawDirective = data[key]

    return new ConfigurationDirective(
      key,
      rawDirective.type.replace('?', ''),
      rawDirective.title,
      rawDirective.default,
      rawDirective.unit || null,
      !rawDirective.type.startsWith('?')
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
