import React from "react"
import {
  ConfigurationDirective, ConfigurationStructure,
  TYPE_INTEGER, TYPE_STRING, TYPE_TIME_DELTA
} from "./ConfigurationStructure"

type Props = {
  configurationStructure: ConfigurationStructure,
}

const ConfigurationStructureComponent = ({configurationStructure}: Props) => {
  return <div>
    {configurationStructure.configuration.map((directive: ConfigurationDirective) => {
      if (directive.type === TYPE_INTEGER) {
        return <div>{directive.title} <input className="pt-input" type="number"/></div>

      } else if (directive.type === TYPE_STRING) {
        return <div>{directive.title} <input className="pt-input" type="text"/></div>

      } else if (directive.type === TYPE_TIME_DELTA) {
        return <div>{directive.title} <input className="pt-input" type="number"/> minutes</div>
      }
    })}
  </div>
}

export default ConfigurationStructureComponent
