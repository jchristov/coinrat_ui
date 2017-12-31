// @flow
import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom"

import HeaderComponent from "./HeaderComponent"
import DashboardComponent from "./DashboardComponent"
import SocketEventLogComponent from "./Sockets/SocketEventLog/SocketEventLogComponent"
import {socketEventLogStoreInstance} from "./Sockets/SocketEventLog/SocketEventLogStore"

class App extends Component<{}> {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <HeaderComponent/>
            <div className="main-content" style={{padding: "1em"}}>
              <div className="workspace">
                <Route exact path="/" render={() => {
                  return <DashboardComponent/>
                }}/>
                <Route path="/socket-event-log" render={() => {
                  return <SocketEventLogComponent store={socketEventLogStoreInstance}/>
                }}/>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
