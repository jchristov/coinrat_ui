import React from "react"
import {Box, Flex} from "reflexbox"
import {Label} from "@blueprintjs/core"

type Props = {
  element: string,
  label: string,
  labelSize: number,
  suffix: string
}

const FormItemComponent = ({element, label, labelSize = 120, suffix = ''}: Props) => {

  return <Flex>
    <Box w={labelSize} className="form-item form-label"><Label text={`${label}:`}/></Box>
    <Box auto className="form-item form-element">{element}</Box>
    <Box className="form-item form-suffix">{suffix}</Box>
  </Flex>

}

export default FormItemComponent
