// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import BalancesOverviewComponent from "./BalancesOverviewComponent"

class BalancesOverviewContainer extends Component<{}> {
  render = () => <BalancesOverviewComponent {...filterStoreInstance}/>
}

export default observer(BalancesOverviewContainer)
