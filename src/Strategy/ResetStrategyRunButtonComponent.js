// @flow
import React from "react"
import {Button} from "@blueprintjs/core"
import {Tooltip2} from "@blueprintjs/labs"

type Props = {
  onClick: () => void,
}

const ResetStrategyRunButtonComponent = ({onClick}: Props) => {
  return <Tooltip2 content="Reset selection of strategy run and see all orders in storage.">
    <Button
      style={{marginTop: 1 + 'px'}}
      className="pt-intent-warning"
      iconName="pt-icon-filter-remove"
      onClick={onClick}
    />
  </Tooltip2>
}

export default ResetStrategyRunButtonComponent
