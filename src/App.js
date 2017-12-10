import React, {Component} from 'react'
import './App.css'
import {Intent, Spinner} from "@blueprintjs/core"
import Header from "./components/Header"
import SocketEventLogComponent from "./components/SocketEventLogComponent"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <h1 className="App-title">Coinrat - Auto-Trading platform</h1>
        </header>
        <Spinner intent={Intent.PRIMARY}/>
        <SocketEventLogComponent />
      </div>
    )
  }
}

export default App
