const TYPE_STRING = 'string'
const TYPE_INTEGER = 'int'
const TYPE_TIME_DELTA = 'timedelta'

const POSSIBLE_TYPES = TYPE_STRING | TYPE_INTEGER | TYPE_TIME_DELTA

class ConfigurationDirective {
  key: string
  type: POSSIBLE_TYPES
  title: string
  isRequired: boolean

  constructor(key: string, type: POSSIBLE_TYPES, title: string, isRequired: boolean) {
    this.key = key
    this.type = type
    this.title = title
    this.isRequired = isRequired
  }
}

class ConfigurationStructure {
  configuration: Array<ConfigurationDirective>

  constructor(configuration: Array<ConfigurationDirective>) {
    this.configuration = configuration
  }
}

const createConfigurationStructureFromRawData = (data) => {
  const configuration = Object.keys(data).map((key: string) => {
    const rawDirective = data[key]
    const type = rawDirective.type.replace('?', '')
    const isRequired = !rawDirective.type.startsWith('?')
    return new ConfigurationDirective(key, type, rawDirective.title, isRequired)
  })

  return new ConfigurationStructure(configuration)
}

export {
  ConfigurationStructure,
  ConfigurationDirective,
  createConfigurationStructureFromRawData,
  TYPE_STRING,
  TYPE_INTEGER,
  TYPE_TIME_DELTA,
}
