// @flow
import React from "react"
import {Button, Position, Tooltip} from "@blueprintjs/core"

type Props = {
  onClick: () => void,
}

const RunStrategyButtonComponent = ({onClick}: Props) => {
  return <Tooltip content="Run simulation of strategy on given time range" position={Position.BOTTOM}>
    <Button
      style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
      className="pt-intent-primary"
      iconName="pt-icon-play"
      onClick={onClick}
    />
  </Tooltip>
}

export default RunStrategyButtonComponent
