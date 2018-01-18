// @flow
import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom"

import HeaderComponent from "./HeaderComponent"
import SocketEventLogComponent from "./Sockets/SocketEventLog/SocketEventLogComponent"
import {observer} from "mobx-react"
import DashboardContainer from "./Dashboard/DashboardContainer"
import OrdersOverviewContainer from "./OrderOverview/OrdersOverviewContainer"

class App extends Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <HeaderComponent/>
          <div className="main-content" style={{padding: "0.4em 1em 1em 1em"}}>
            <div className="workspace">
              <Route exact path="/" component={DashboardContainer}/>
              <Route path="/socket-event-log" component={SocketEventLogComponent}/>
              <Route path="/orders" component={OrdersOverviewContainer}/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default observer(App)
