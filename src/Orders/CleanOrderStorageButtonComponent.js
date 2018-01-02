// @flow
import React from "react"
import {Button} from "@blueprintjs/core/dist/components/button/buttons"

type Props = {
  onClick: () => void,
}

const CleanOrderStorageButtonComponent = ({onClick}: Props) => {
  return <Button
    style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
    className="pt-intent-danger"
    iconName="pt-icon-eraser"
    onClick={onClick}
  >
    Clean order storage
  </Button>
}

export default CleanOrderStorageButtonComponent
