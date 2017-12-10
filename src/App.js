import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom"

import HeaderComponent from "./components/HeaderComponent"
import SocketEventLogComponent from "./components/SocketEventLogComponent"
import DashboardComponent from "./components/DashboardComponent"

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <HeaderComponent/>
            <div className="main-content" style={{padding: "1em"}}>
              <div className="workspace">
                <Route exact path="/" render={(props) => {
                  return <div><DashboardComponent/></div>
                }}/>
                <Route path="/socket-event-log" component={SocketEventLogComponent}/>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
