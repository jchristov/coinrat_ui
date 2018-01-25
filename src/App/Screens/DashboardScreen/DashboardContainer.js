// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import DashboardComponent from "./DashboardComponent"
import {filterStoreInstance, mainChartStoreInstance} from "../../diContainer"

class DashboardContainer extends Component<{}> {
  render = () => <DashboardComponent {...filterStoreInstance} candleSize={mainChartStoreInstance.candleSize}/>
}

export default observer(DashboardContainer)
