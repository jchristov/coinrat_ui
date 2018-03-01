// @flow
import React from "react"
import {Colors} from "@blueprintjs/core"
import {Table, Column, Cell, TableLoadingOption} from "@blueprintjs/table"
import {Order} from "./Order"
import {ORDERS_DIRECTION_COLORS, ORDERS_STATUS_COLORS} from "./ChartColors"
import ColoredDotComponent from "../Icon/ColoredDotComponent"
import NumberComponent from "../Number/NumberComponent"

type Props = {
  orders: Array<Order>
}

const OrdersTableComponent = ({orders}: Props) => {
  const loadingOptions: Array<TableLoadingOption> = []
  if (orders.length === 0) {
    loadingOptions.push(TableLoadingOption.CELLS)
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
    <Column name="id" renderCell={(row: number) => <Cell>{orders[row].orderId}</Cell>}/>
    <Column name="Strategy run id" renderCell={(row: number) => <Cell>{orders[row].strategyRunId}</Cell>}/>
    <Column name="Market" renderCell={(row: number) => <Cell>{orders[row].market}</Cell>}/>
    <Column name="Buy/Sell" renderCell={directionCellRender}/>
    <Column name="Created" renderCell={(row: number) => <Cell>{orders[row].createdAt.toLocaleString()}</Cell>}/>
    <Column name="Pair" renderCell={(row: number) => <Cell>{orders[row].pair}</Cell>}/>
    <Column name="Type" renderCell={(row: number) => <Cell>{orders[row].type}</Cell>}/>

    <Column name="Base curr. before" renderCell={(row: number) => {
      let baseCurrencyRow = ''
      if (orders[row].portfolioSnapshot !== null) {
        const [base_currency] = orders[row].pair.split('_')
        baseCurrencyRow = <NumberComponent
          number={Number(orders[row].portfolioSnapshot.balances[base_currency].availableAmount)}
          colored
        />
      }

      return <Cell style={{textAlign: 'right'}}>{baseCurrencyRow}</Cell>
    }}/>
    <Column name="Market curr. before" renderCell={(row: number) => {
      let marketCurrencyRow = ''
      if (orders[row].portfolioSnapshot !== null) {
        const [, market_currency] = orders[row].pair.split('_')
        marketCurrencyRow = <NumberComponent
          number={Number(orders[row].portfolioSnapshot.balances[market_currency].availableAmount)}
          colored
        />
      }

      return <Cell style={{textAlign: 'right'}}>{marketCurrencyRow}</Cell>
    }}/>

    <Column name="Total in base curr." renderCell={(row: number) => {
      let change = null
      if (row > 0) {
        change = orders[row].getTotalAfterOrderInBaseCurrency() - orders[row - 1].getTotalAfterOrderInBaseCurrency()
      }

      const forceColor = change !== null ? (change > 0 ? Colors.GREEN1 : Colors.RED1) : null

      return <Cell style={{textAlign: 'right'}}>
        <NumberComponent number={orders[row].getTotalAfterOrderInBaseCurrency()} colored forceColor={forceColor}/>
      </Cell>
    }}/>

    <Column name="Base curr. change" renderCell={(row: number) =>
      <Cell style={{textAlign: 'right'}}>
        <NumberComponent number={orders[row].transactionBaseCurrencyValue()} colored/>
      </Cell>
    }/>

    <Column name="Market curr. change" renderCell={(row: number) =>
      <Cell style={{textAlign: 'right'}}>
        <NumberComponent number={orders[row].transactionMarketCurrencyValue()} colored/>
      </Cell>
    }/>

    <Column name="Rate" renderCell={(row: number) =>
      <Cell style={{textAlign: 'right'}}><NumberComponent number={Number(orders[row].rate)}/></Cell>
    }/>

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
