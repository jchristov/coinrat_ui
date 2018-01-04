// @flow
import React from "react"
import {Button, Position, Tooltip} from "@blueprintjs/core"

type Props = {
  onClick: () => void,
}

const CleanOrderStorageButtonComponent = ({onClick}: Props) => {
  return <Tooltip content="Delete all orders from selected storage in given time range" position={Position.BOTTOM}>
    <Button
      style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
      className="pt-intent-danger"
      iconName="pt-icon-eraser"
      onClick={onClick}
    />
  </Tooltip>
}

export default CleanOrderStorageButtonComponent
