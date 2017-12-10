import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom"

import Header from "./components/Header"
import SocketEventLogComponent from "./components/SocketEventLogComponent"

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header/>
            <div className="main-content" style={{padding: "1em"}}>
              <div className="workspace">
                <Route exact path="/" render={(props) => {
                  return <div></div>
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
