// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import BalancesOverviewComponent from "./BalancesOverviewComponent"
import {filterStoreInstance} from "../../diContainer"

class BalancesOverviewContainer extends Component<{}> {
  render = () => <BalancesOverviewComponent {...filterStoreInstance}/>
}

export default observer(BalancesOverviewContainer)
