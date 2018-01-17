import React from "react"
import {Position, Tooltip, Button} from "@blueprintjs/core"

type Props = {
  onClick: () => void,
}

const ResetToDefaultButton = ({onClick}: Props) => {
  return <Tooltip content="Reset to default" position={Position.BOTTOM}>
    <Button style={{marginTop: 1 + 'px'}} iconName="pt-icon-repeat" className="pt-intent-danger" onClick={onClick}/>
  </Tooltip>
}

export default ResetToDefaultButton
