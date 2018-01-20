// @flow
import React from "react"
import {Checkbox, Label} from "@blueprintjs/core"
import {Box, Flex} from "reflexbox"

type Props = {
  hideZeroBalances: boolean,
  onChangeShowZeroBalances: (showZeroBalances: boolean) => void,
}

const BalanceTableToolbarComponent = ({hideZeroBalances, onChangeShowZeroBalances}: Props) => {
  return <Flex>
    <Box><Label text="Hide zero balances:"/></Box>
    <Box><Checkbox style={{marginLeft: 4 + 'px'}} checked={hideZeroBalances} onChange={onChangeShowZeroBalances}/></Box>
  </Flex>
}

export default BalanceTableToolbarComponent
