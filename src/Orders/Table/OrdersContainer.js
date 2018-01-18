// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import OrdersComponent from "./OrdersComponent"

class OrdersContainer extends Component<{}> {

  render = () => {
    return <OrdersComponent />
  }
}

export default observer(OrdersContainer)
