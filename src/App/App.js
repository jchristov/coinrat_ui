// @flow
import React, {Component} from 'react'
import {BrowserRouter, Route} from "react-router-dom"
import {observer} from "mobx-react"
import DashboardContainer from "./Screens/DashboardScreen/DashboardContainer"
import OrdersOverviewContainer from "./Screens/OrdersListScreen/OrdersOverviewContainer"
import BalancesOverviewContainer from "./Screens/BalanceScreen/BalancesOverviewContainer"
import HeaderComponent from "./Menu/HeaderComponent"

class App extends Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <HeaderComponent/>
          <div className="main-content" style={{padding: "0.4em 1em 1em 1em"}}>
            <div className="workspace">
              <Route exact path="/" component={DashboardContainer}/>
              <Route path="/orders" component={OrdersOverviewContainer}/>
              <Route path="/balances" component={BalancesOverviewContainer}/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default observer(App)
