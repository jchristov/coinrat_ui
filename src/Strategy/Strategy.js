// @flow
import {extendObservable} from "mobx"
import {ConfigurationDirective, ConfigurationStructure} from "../ConfigurationStructure/ConfigurationStructure"

class Strategy {
  name: string
  title: string
  configurationStructure: ConfigurationStructure

  constructor(name: string, title: string, configurationStructure: ConfigurationStructure) {
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
  Strategy,
}
