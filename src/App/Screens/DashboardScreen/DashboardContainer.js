// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import DashboardComponent from "./DashboardComponent"
import {filterStoreInstance, candleSizeStoreInstance} from "../../diContainer"

class DashboardContainer extends Component<{}> {
  render = () => <DashboardComponent {...filterStoreInstance} candleSize={candleSizeStoreInstance.candleSize}/>
}

export default observer(DashboardContainer)
