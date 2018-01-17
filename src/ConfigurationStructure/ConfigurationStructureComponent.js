import React from "react"
import {Popover2} from "@blueprintjs/labs"
import {Button, Tooltip, Position} from "@blueprintjs/core"
import {
  ConfigurationDirective, ConfigurationStructure,
  TYPE_INTEGER, TYPE_STRING, TYPE_TIME_DELTA
} from "./ConfigurationStructure"

type Props = {
  configurationStructure: ConfigurationStructure,
}

const ConfigurationStructureComponent = ({configurationStructure}: Props) => {
  const content = configurationStructure.configuration.map((directive: ConfigurationDirective) => {
    if (directive.type === TYPE_INTEGER) {
      return <div>{directive.title} <input className="pt-input" type="number"/></div>

    } else if (directive.type === TYPE_STRING) {
      return <div>{directive.title} <input className="pt-input" type="text"/></div>

    } else if (directive.type === TYPE_TIME_DELTA) {
      return <div>{directive.title} <input className="pt-input" type="number"/> minutes</div>
    }
  })

  const target = <Tooltip content="You can change settings of a strategy." position={Position.BOTTOM}>
    <Button
      style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
      className="pt-intent-warningě"
      iconName="pt-icon-settings"
    />
  </Tooltip>

  return <Popover2 content={content} target={target}/>
}

export default ConfigurationStructureComponent
