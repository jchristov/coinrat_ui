import React from "react"
import {Box, Flex} from "reflexbox"
import {Label} from "@blueprintjs/core"
import HelpIconComponent from "../HelpIconComponent"

type Props = {
  element: string,
  label: string,
  labelSize: number,
  suffix: string,
  description: string
}

const FormItemComponent = ({element, label, labelSize = 120, suffix = '', description = ''}: Props) => {

  if (description !== '') {
    description = <HelpIconComponent helpText={description}/>
  }

  return <Flex>
    <Box w={labelSize} className="form-item form-label"><Label text={`${label}:`}/></Box>
    <Box className="form-item form-element">{element}</Box>
    <Box className="form-item form-suffix">{description} {suffix}</Box>
  </Flex>

}

export default FormItemComponent
