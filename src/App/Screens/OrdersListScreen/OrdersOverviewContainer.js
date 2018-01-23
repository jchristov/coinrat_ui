// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "../../diContainer"
import OrdersOverviewComponent from "./OrdersOverviewComponent"

class OrdersOverviewContainer extends Component<{}> {
  render = () => <OrdersOverviewComponent {...filterStoreInstance}/>
}

export default observer(OrdersOverviewContainer)
