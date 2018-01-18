// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import OrdersOverviewComponent from "./OrdersOverviewComponent"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"

class OrdersOverviewContainer extends Component<{}> {
  render = () => <OrdersOverviewComponent {...filterStoreInstance}/>
}

export default observer(OrdersOverviewContainer)
