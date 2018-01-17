// @flow
import React from "react"
import {Button} from "@blueprintjs/core"
import {Tooltip2} from "@blueprintjs/labs"

type Props = {
  onClick: () => void,
}

const CleanOrderStorageButtonComponent = ({onClick}: Props) => {
  return <Tooltip2 content="Delete all orders from selected storage in given time range">
    <Button style={{marginTop: 1 + 'px'}} className="pt-intent-danger" iconName="pt-icon-eraser" onClick={onClick}/>
  </Tooltip2>
}

export default CleanOrderStorageButtonComponent
