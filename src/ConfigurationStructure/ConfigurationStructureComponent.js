import React from "react"
import {Popover2} from "@blueprintjs/labs"
import {Button, Tooltip, Position, NonIdealState} from "@blueprintjs/core"
import {
  ConfigurationDirective,
  ConfigurationStructure,
  TYPE_DECIMAL,
  TYPE_INTEGER,
  TYPE_STRING
} from "./ConfigurationStructure"
import {Box, Flex} from "reflexbox"
import FormItemComponent from "../Form/FormItemComponent"

type Props = {
  configurationStructure: ConfigurationStructure,
}

const ConfigurationStructureComponent = ({configurationStructure}: Props) => {

  const configurationMapFunction = (directive: ConfigurationDirective, key: number) => {
    const inputStyles = {width: 80 + 'px'}

    let element = ''
    if (directive.type === TYPE_INTEGER) {
      element = <input style={inputStyles} value={directive.defaults} className="pt-input" type="number"/>

    } else if (directive.type === TYPE_STRING) {
      element = <input style={inputStyles} value={directive.defaults} className="pt-input" type="text"/>

    } else if (directive.type === TYPE_DECIMAL) {
      element = <input style={inputStyles} value={directive.defaults} className="pt-input" type="text"/>
    }

    return <Box key={key}>
      <FormItemComponent labelSize={200} label={directive.title} element={element} suffix={directive.unit}/>
    </Box>
  }

  let content = ''
  if (configurationStructure.configuration.length === 0) {
    content = <NonIdealState
      visual="lightbulb"
      title="Nothing to configure."
      description="If you want to change some property of this strategy, you need to adjust implementation and allow configuration."
    />
  } else {
    content = configurationStructure.configuration.map(configurationMapFunction)
  }

  const target = <Tooltip content="You can change settings of a strategy." position={Position.BOTTOM}>
    <Button style={{marginTop: 1 + 'px'}} iconName="pt-icon-settings"/>
  </Tooltip>

  return <Popover2 content={<Flex column style={{padding: 15 + 'px'}}>{content}</Flex>} target={target}/>
}

export default ConfigurationStructureComponent
