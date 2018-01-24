// @flow
import React from 'react'
import {Intent, Icon} from "@blueprintjs/core"
import {Tooltip2} from "@blueprintjs/labs"

type Props = {
  isOnline: boolean,
}

const StatusIndicatorComponent = ({isOnline}: Props) => {
  const intent = isOnline ? Intent.SUCCESS : Intent.DANGER
  const tooltipContent = isOnline
    ? 'Connection with backend is just OK.'
    : 'Connection with backend cannot be established.'

  return (
    <Tooltip2 content={tooltipContent}>
      <Icon intent={intent} iconName="pt-icon-dot" iconSize="inherit"/>
    </Tooltip2>
  )
}

export default StatusIndicatorComponent
