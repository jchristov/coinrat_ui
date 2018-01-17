// @flow
import React, {Component} from 'react'
import {Intent, Icon} from "@blueprintjs/core"
import {Tooltip2} from "@blueprintjs/labs"
import {observer} from "mobx-react"
import {StatusIndicatorStore} from "./StatusIndicatorStore"

type Props = {
  store: StatusIndicatorStore,
}

const StatusIndicatorComponent = observer(class StatusIndicatorComponent extends Component<Props> {
  props: Props

  render() {
    const isOnline = this.props.store.isOnline
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
})

export default StatusIndicatorComponent
