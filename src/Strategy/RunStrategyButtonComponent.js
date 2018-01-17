// @flow
import React from "react"
import {Button} from "@blueprintjs/core"
import {Tooltip2} from "@blueprintjs/labs"

type Props = {
  onClick: () => void,
}

const RunStrategyButtonComponent = ({onClick}: Props) => {
  return <Tooltip2 content="Run simulation of strategy on given time range">
    <Button
      style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
      className="pt-intent-primary"
      iconName="pt-icon-play"
      onClick={onClick}
    />
  </Tooltip2>
}

export default RunStrategyButtonComponent
