// @flow
import React from "react"
import {Table, Column, Cell, TableLoadingOption} from "@blueprintjs/table"
import {Balance} from "./../Balance"

type Props = {
  balances: Array<Balance>
}

const BalanceTableComponent = ({balances}: Props) => {
  const loadingOptions: Array<TableLoadingOption> = []
  if (balances.length === 0) {
    loadingOptions.push(TableLoadingOption.CELLS)
    loadingOptions.push(TableLoadingOption.ROW_HEADERS)
  }

  return <Table numRows={balances.length} loadingOptions={loadingOptions}>
    <Column name="Currency" renderCell={(row: number) => <Cell>{balances[row].currency}</Cell>}/>
    <Column name="Available amount" renderCell={(row: number) =>
      <Cell style={{textAlign: 'right'}}><code>{Number(balances[row].availableAmount).toFixed(8)}</code></Cell>}
    />
  </Table>
}

export default BalanceTableComponent
