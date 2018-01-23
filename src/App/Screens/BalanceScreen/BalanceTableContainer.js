// @flow
import React from "react"
import {observer} from "mobx-react"
import {Box, Flex} from "reflexbox"
import {balanceOverviewStoreInstance, balanceStoreInstance} from "../../diContainer"
import {Balance} from "../../../Balance/Balance"
import BalanceTableComponent from "../../../Balance/Table/BalanceTableComponent"
import BalanceLegendComponent from "../../../BalanceOverview/BalanceLegendComponent"
import BalanceTableToolbarComponent from "../../../Balance/Table/BalanceTableToolbarComponent"

const BalanceTableContainer = () => {
  const hideZeroBalances = balanceOverviewStoreInstance.hideZeroBalances

  let balances = balanceStoreInstance.balances.slice()
  if (hideZeroBalances) {
    balances = balances.filter((balance: Balance) => {
      return balance.availableAmount !== '0'
    })
  }

  const handleHideZeroBalanceCheckbox = (e) => {
    balanceOverviewStoreInstance.setHideZeroBalances(e.target.checked)
  }

  return <Flex align='center top'>
    <Box style={{paddingRight: 50 + 'px'}}>
      <BalanceTableComponent balances={balances}/>
    </Box>
    <Box style={{paddingRight: 10 + 'px'}} w={256}>
      <BalanceLegendComponent/>
      <BalanceTableToolbarComponent
        hideZeroBalances={hideZeroBalances}
        onChangeShowZeroBalances={handleHideZeroBalanceCheckbox}
      />
    </Box>
  </Flex>
}

export default observer(BalanceTableContainer)
