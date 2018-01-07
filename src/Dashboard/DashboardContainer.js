// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./../TopLineToolbar/FilterStore"
import DashboardComponent from "./DashboardComponent"

class DashboardContainer extends Component<{}> {
  render = () => <DashboardComponent {...filterStoreInstance}/>
}

export default observer(DashboardContainer)
