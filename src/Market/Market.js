import {extendObservable} from "mobx/lib/mobx"
import {ConfigurationDirective} from "../ConfigurationStructure/ConfigurationStructure"

const MOCK_MARKET_NAME = 'mock'

class Market {
  name: string
  title: string
  configurationStructure: Object

  constructor(name: string, title: string, configurationStructure: Object) {
    this.name = name
    this.title = title

    extendObservable(this, {
      configurationStructure: configurationStructure
    })
  }

  setConfigurationField = (key: string, value: string) => {
    const findDirectiveFunction = (directive: ConfigurationDirective) => {
      return directive.key === key
    }
    const directive: ConfigurationDirective = this.configurationStructure.configuration.find(findDirectiveFunction)
    directive.value = value
  }

  resetConfigurationToDefault = () => {
    this.configurationStructure.configuration.forEach((directive: ConfigurationDirective) => {
      directive.resetToDefault()
    })
  }
}

export {
  Market,
  MOCK_MARKET_NAME
}
