// @flow
import React from "react"
import {Table, Column, Cell, TableLoadingOption} from "@blueprintjs/table"
import {Order} from "./Order"
import {ORDERS_DIRECTION_COLORS, ORDERS_STATUS_COLORS} from "./ChartColors"
import ColoredDotComponent from "../Icon/ColoredDotComponent"

type Props = {
  orders: Array<Order>
}

const OrdersTableComponent = ({orders}: Props) => {
  const loadingOptions: Array<TableLoadingOption> = []
  if (orders.length === 0) {
    loadingOptions.push(TableLoadingOption.CELLS)
    loadingOptions.push(TableLoadingOption.COLUMN_HEADERS)
    loadingOptions.push(TableLoadingOption.ROW_HEADERS)
  }

  const directionCellRender = (row: number) => {
    const direction = orders[row].direction
    return <Cell><ColoredDotComponent color={ORDERS_DIRECTION_COLORS[direction]}/>{' '}{direction}</Cell>
  }

  const statusCellRender = (row: number) => {
    const status = orders[row].status
    return <Cell><ColoredDotComponent color={ORDERS_STATUS_COLORS[status]}/>{' '}{status}</Cell>
  }

  return <Table numRows={orders.length} loadingOptions={loadingOptions}>
    <Column name="ID" renderCell={(row: number) => <Cell>{orders[row].orderId}</Cell>}/>
    <Column name="Market" renderCell={(row: number) => <Cell>{orders[row].market}</Cell>}/>
    <Column name="Buy/Sell" renderCell={directionCellRender}/>
    <Column name="Created" renderCell={(row: number) => <Cell>{orders[row].createdAt.toLocaleString()}</Cell>}/>
    <Column name="Pair" renderCell={(row: number) => <Cell>{orders[row].pair}</Cell>}/>
    <Column name="Type" renderCell={(row: number) => <Cell>{orders[row].type}</Cell>}/>
    <Column name="Quantity" renderCell={(row: number) => <Cell>{orders[row].quantity}</Cell>}/>
    <Column name="Rate" renderCell={(row: number) => <Cell>{orders[row].rate}</Cell>}/>
    <Column name="Id on market" renderCell={(row: number) => <Cell>{orders[row].idOnMarket}</Cell>}/>
    <Column name="Status" renderCell={statusCellRender}/>
    <Column name="Closed" renderCell={(row: number) =>
      <Cell>{orders[row].closedAt === null ? 'n/a' : orders[row].closedAt.toLocaleString()}</Cell>}
    />
    <Column name="Canceled" renderCell={(row: number) =>
      <Cell>{orders[row].canceledAt === null ? 'n/a' : orders[row].canceledAt.toLocaleString()}</Cell>}
    />
  </Table>
}

export default OrdersTableComponent
