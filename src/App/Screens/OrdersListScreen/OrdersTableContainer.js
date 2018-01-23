// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import {orderStoreInstance} from "../../diContainer"
import OrdersTableComponent from "../../../Orders/OrdersTableComponent"

class OrdersTableContainer extends Component<{}> {

  render = () => {
    return <OrdersTableComponent orders={orderStoreInstance.orders.slice()}/>
  }
}

export default observer(OrdersTableContainer)
