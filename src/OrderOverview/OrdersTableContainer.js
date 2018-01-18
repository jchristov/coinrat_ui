// @flow
import React, {Component} from "react"
import {observer} from "mobx-react"
import OrdersTableComponent from "../Orders/OrdersTableComponent"
import {orderStoreInstance} from "../Orders/OrderStore"

class OrdersTableContainer extends Component<{}> {

  render = () => {
    return <OrdersTableComponent orders={orderStoreInstance.orders.slice()}/>
  }
}

export default observer(OrdersTableContainer)
