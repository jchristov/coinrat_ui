// @flow
import React, {Component} from 'react'
import TopLineToolbarComponent from "./TopLineToolbar/TopLineToolbarComponent"
import CandlestickChartComponent from "./MainChart/CandlestickChartComponent"
import {observer} from "mobx-react"

class DashboardComponent extends Component<{}> {
  render() {
    return (
      <div>
        <TopLineToolbarComponent/>
        <CandlestickChartComponent/>
      </div>
    )
  }
}

export default observer(DashboardComponent)
