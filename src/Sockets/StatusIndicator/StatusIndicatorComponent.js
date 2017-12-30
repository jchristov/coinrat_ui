// @flow
import React, {Component} from 'react'
import {Intent, Icon, Position, Tooltip} from "@blueprintjs/core"
import {observer} from "mobx-react"
import {StatusIndicatorStore} from "./StatusIndicatorStore"

type Props = {
  store: StatusIndicatorStore,
}

const StatusIndicatorComponent = observer(class StatusIndicatorComponent extends Component {
  props: Props

  render() {
    const isOnline = this.props.store.isOnline
    const intent = isOnline ? Intent.SUCCESS : Intent.DANGER
    const tooltipContent = isOnline
      ? 'Connection with backend is just OK.'
      : 'Connection with backend cannot be established.'

    return (
      <Tooltip content={tooltipContent} position={Position.BOTTOM_LEFT}>
        <Icon intent={intent} iconName="pt-icon-dot" iconSize="inherit"/>
      </Tooltip>
    )
  }
})

export default StatusIndicatorComponent
