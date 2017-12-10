import React, {Component} from 'react'
import {Intent, Icon, Position, Tooltip} from "@blueprintjs/core"
import {socket} from '../socket'

class StatusIndicator extends Component {
  constructor() {
    super()
    this.state = {online: false}
  }

  componentWillMount() {
    socket.on('connect', () => {
      this.setState({online: true})
    })
    socket.on('disconnect', () => {
      this.setState({online: false})
    })
  }

  componentWillUnmount() {
  }

  render() {
    const intent = this.state.online ? Intent.SUCCESS : Intent.DANGER
    const tooltipContent = this.state.online
      ? 'Connection with backend is just OK.'
      : 'Connection with backend cannot be established.'

    return (

      <Tooltip content={tooltipContent} position={Position.BOTTOM_LEFT}>
        <Icon intent={intent} iconName="pt-icon-dot" iconSize="inherit"/>
      </Tooltip>
    )
  }
}

export default StatusIndicator
