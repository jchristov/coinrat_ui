import React from "react"
import {Icon, Intent} from "@blueprintjs/core"
import {Tooltip2} from "@blueprintjs/labs"

type Props = {
  helpText: string
}

const HelpIconComponent = ({helpText}: Props) => {
  return <Tooltip2 content={helpText}>
    <Icon iconSize={Icon.SIZE_STANDARD} intent={Intent.PRIMARY} iconName="pt-icon-info-sign"/>
  </Tooltip2>
}

export default HelpIconComponent
