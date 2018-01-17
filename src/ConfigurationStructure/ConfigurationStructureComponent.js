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
import ResetToDefaultButton from "../Form/ResetToDefaultButton"

type Props = {
  configurationStructure: ConfigurationStructure,
  onChange: () => void,
  onReset: () => void,
}

const ConfigurationStructureComponent = ({configurationStructure, onChange, onReset}: Props) => {

  const configurationMapFunction = (directive: ConfigurationDirective, key: number) => {
    const inputProps = {
      style: {width: 80 + 'px'},
      defaultValue: directive.value,
      className: "pt-input",
      onChange: onChange,
      name: directive.key,
    }

    let element = ''
    if (directive.type === TYPE_INTEGER) {
      element = <input {...inputProps} type="number"/>

    } else if (directive.type === TYPE_STRING) {
      element = <input {...inputProps} type="text"/>

    } else if (directive.type === TYPE_DECIMAL) {
      element = <input {...inputProps} type="text"/>
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
      description="If you want to change some property, you need to adjust implementation and allow configuration."
    />
  } else {
    content = <Flex column>
      <Box>{configurationStructure.configuration.map(configurationMapFunction)}</Box>
      <Box style={{textAlign: 'right'}}><ResetToDefaultButton onClick={onReset}/></Box>
    </Flex>
  }

  const target = <Tooltip content="You can change settings of a strategy." position={Position.BOTTOM}>
    <Button style={{marginTop: 1 + 'px'}} iconName="pt-icon-settings"/>
  </Tooltip>

  return <Popover2 content={<Flex column style={{padding: 15 + 'px'}}>{content}</Flex>} target={target}/>
}

export default ConfigurationStructureComponent
