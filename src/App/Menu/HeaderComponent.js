// @flow
import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {Tooltip2} from "@blueprintjs/labs"
import {statusIndicatorStoreInstance} from "../diContainer"
import SimulationModeSwitcherContainer from "./SimulationModeSwitcherContainer"
import StatusIndicatorComponent from "../../Sockets/StatusIndicator/StatusIndicatorComponent"

class HeaderComponent extends Component<{}> {
  render() {
    return (
      <nav className="pt-navbar pt-dark">

        <div className="pt-navbar-group pt-align-left">
          <StatusIndicatorComponent store={statusIndicatorStoreInstance}/>

          <span className="pt-navbar-divider"/>

          <Link className="pt-button pt-minimal pt-icon-dashboard" to="/">Dashboard</Link>
          <Link className="pt-button pt-minimal pt-icon-applications" to="/orders">Orders</Link>
          <Link className="pt-button pt-minimal pt-icon-dollar" to="/balances">Balance</Link>

          <span className="pt-navbar-divider"/>

          <SimulationModeSwitcherContainer/>
        </div>

        <div className="pt-navbar-group pt-align-right">
          <span className="pt-navbar-divider"/>

          <Tooltip2 content="View source on Github">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/Achse/coinrat_ui">
              <button className="pt-button pt-minimal pt-icon-git-branch"/>
            </a>
          </Tooltip2>
        </div>

      </nav>
    )
  }
}

export default HeaderComponent
