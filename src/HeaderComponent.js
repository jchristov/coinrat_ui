// @flow
import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {Position, Tooltip} from "@blueprintjs/core"
import {statusIndicatorStoreInstance} from "./Sockets/StatusIndicator/StatusIndicatorStore"
import StatusIndicatorComponent from "./Sockets/StatusIndicator/StatusIndicatorComponent"

class HeaderComponent extends Component {
  render() {
    return (
      <nav className="pt-navbar pt-dark">

        <div className="pt-navbar-group pt-align-left">
          <StatusIndicatorComponent store={statusIndicatorStoreInstance}/>

          <span className="pt-navbar-divider"/>

          <Link className="pt-button pt-minimal pt-icon-dashboard" to="/">Dashboard</Link>
          <Link className="pt-button pt-minimal pt-icon-console" to="/socket-event-log">Socket Event Log</Link>
        </div>

        <div className="pt-navbar-group pt-align-right">
          <span className="pt-navbar-divider"/>

          <Tooltip content="View source on Github" position={Position.BOTTOM_RIGHT}>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Achse/coinrat_ui">
              <button className="pt-button pt-minimal pt-icon-git-branch"/>
            </a>
          </Tooltip>
        </div>

      </nav>
    )
  }
}

export default HeaderComponent
