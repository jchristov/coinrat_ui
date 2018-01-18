// @flow
import React from "react"
import {Tooltip2} from "@blueprintjs/labs"
import {Button} from "@blueprintjs/core"

type Props = {
  onClick: () => void,
}

const ResetToDefaultButton = ({onClick}: Props) => {
  return <Tooltip2 content="Reset to default">
    <Button style={{marginTop: 1 + 'px'}} iconName="pt-icon-repeat" className="pt-intent-danger" onClick={onClick}/>
  </Tooltip2>
}

export default ResetToDefaultButton
