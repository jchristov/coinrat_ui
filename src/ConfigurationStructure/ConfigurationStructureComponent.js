// @flow
import React from "react"
import {Popover2, Tooltip2} from "@blueprintjs/labs"
import {Button, NonIdealState} from "@blueprintjs/core"
import {
  ConfigurationDirective,
  ConfigurationStructure, TYPE_CANDLE_SIZE,
  TYPE_DECIMAL,
  TYPE_INTEGER,
  TYPE_STRING
} from "./ConfigurationStructure"
import {Box, Flex} from "reflexbox"
import FormItemComponent from "../Form/FormItemComponent"
import ResetToDefaultButton from "../Form/ResetToDefaultButton"
import {observer} from "mobx-react"
import CandleSizeSelectComponent from "../Candle/CandleSize/CandleSizeSelectComponent"

type Props = {
  tooltip: string,
  noConfigurationDescription: string,
  configurationStructure: ConfigurationStructure,
  onChange: () => void,
  onReset: () => void,
}

const ConfigurationStructureComponent = (
  {
    tooltip,
    noConfigurationDescription,
    configurationStructure,
    onChange,
    onReset
  }: Props) => {

  const configurationMapFunction = (directive: ConfigurationDirective, key: number) => {

    const inputProps = {
      style: {width: 80 + 'px'},
      value: directive.value,
      className: "pt-input",
      onChange: onChange,
      name: directive.key,
      disabled: directive.isDisabled,
    }

    let element = ''
    if (directive.type === TYPE_INTEGER) {
      element = <input {...inputProps} type="number"/>

    } else if (directive.type === TYPE_STRING) {
      element = <input {...inputProps} type="text"/>

    } else if (directive.type === TYPE_DECIMAL) {
      element = <input {...inputProps} type="text"/>

    } else if (directive.type === TYPE_CANDLE_SIZE) {
      const onSelect = (selectedValue: string) => {
        onChange({target: {name: directive.key, value: selectedValue}})
      }

      element = <CandleSizeSelectComponent defaultSelectedAggregation={directive.value} onSelect={onSelect}/>
    }

    return <Box key={key}>
      <FormItemComponent
        labelSize={200}
        label={directive.title}
        element={element}
        suffix={directive.unit}
        description={directive.description}/>
    </Box>
  }

  let content = ''
  if (configurationStructure.configuration.length === 0) {
    content = <NonIdealState
      visual="lightbulb"
      title="Nothing to configure"
      description={noConfigurationDescription}
    />
  } else {
    content = <Flex column>
      <Box>{configurationStructure.configuration.map(configurationMapFunction)}</Box>
      <Box style={{textAlign: 'right'}}><ResetToDefaultButton onClick={onReset}/></Box>
    </Flex>
  }

  const target = <Tooltip2 content={tooltip}>
    <Button style={{marginTop: 1 + 'px'}} iconName="pt-icon-settings"/>
  </Tooltip2>

  return <Popover2 content={<Flex column style={{padding: 15 + 'px'}}>{content}</Flex>} target={target}/>
}

export default observer(ConfigurationStructureComponent)
