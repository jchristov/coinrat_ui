import React from "react"
import {Box, Flex} from "reflexbox"
import {Label} from "@blueprintjs/core"

type Props = {
  element: string,
  label: string,
}

const FormItemComponent = ({element, label}: Props) => {

  return <Flex>
    <Box w={120} className="form-item form-label"><Label text={`${label}:`}/></Box>
    <Box auto className="form-item form-element">{element}</Box>
  </Flex>

}

export default FormItemComponent
