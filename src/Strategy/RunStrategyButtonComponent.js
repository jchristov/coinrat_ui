// @flow
import React from "react"
import {Button} from "@blueprintjs/core"

type Props = {
  onClick: () => void,
}

const RunStrategyButtonComponent = ({onClick}: Props) => {
  return <Button
    style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
    className="pt-intent-primary"
    iconName="pt-icon-play"
    onClick={onClick}
  >
    Run strategy
  </Button>
}

export default RunStrategyButtonComponent
