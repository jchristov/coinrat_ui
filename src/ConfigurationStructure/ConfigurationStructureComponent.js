import React from "react"
import {Popover2} from "@blueprintjs/labs"
import {Button, Tooltip, Position} from "@blueprintjs/core"
import {
  ConfigurationDirective, ConfigurationStructure,
  TYPE_INTEGER, TYPE_STRING, TYPE_TIME_DELTA
} from "./ConfigurationStructure"
import {Box, Flex} from "reflexbox"
import FormItemComponent from "../Form/FormItemComponent"

type Props = {
  configurationStructure: ConfigurationStructure,
}

const ConfigurationStructureComponent = ({configurationStructure}: Props) => {

  const configurationMapFunction = (directive: ConfigurationDirective, key: number) => {
    let element = ''
    if (directive.type === TYPE_INTEGER) {
      element = <input className="pt-input" type="number"/>

    } else if (directive.type === TYPE_STRING) {
      element = <input className="pt-input" type="text"/>

    } else if (directive.type === TYPE_TIME_DELTA) {
      element = <input className="pt-input" type="number"/>
    }

    return <Box key={key}><FormItemComponent label={directive.title} element={element}/></Box>
  }

  const content = <Flex column style={{padding: 15 + 'px'}}>
    {configurationStructure.configuration.map(configurationMapFunction)}
  </Flex>

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
