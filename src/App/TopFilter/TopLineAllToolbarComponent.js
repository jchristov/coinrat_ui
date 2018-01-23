// @flow
import React from 'react'
import {Box, Flex} from "reflexbox"
import SelectPairContainer from "./SelectPairContainer"
import SelectMarketContainer from "./SelectMarketContainer"
import SelectOrderStorageContainer from "./SelectOrderStorageContainer"
import CleanOrderStorageButtonContainer from "./CleanOrderStorageButtonContainer"
import RunStrategyButtonContainer from "./RunStrategyButtonContainer"
import SelectCandleStorageContainer from "./SelectCandleStorageContainer"
import SelectStrategyContainer from "./SelectStrategyContainer"
import SelectIntervalContainer from "./SelectIntervalContainer"
import StrategyConfigurationContainer from "./StrategyConfigurationContainer"
import MarketConfigurationContainer from "./MarketConfigurationContainer"

type TopLineAllToolbarComponentProps = {
  isPairSelectorEnabled: boolean,
  isMarketSelectorEnabled: boolean,
  isMarketConfiguratorEnabled: boolean,

  isCandleStorageSelectorEnabled: boolean,
  isOrderStorageSelectorEnabled: boolean,
  isOrderClearButtonEnabled: boolean,

  isIntervalSelectorEnabled: boolean,

  isStrategySelectorEnabled: boolean,
  isStrategyConfiguratorEnabled: boolean,
  isRunStrategyButtonEnabled: boolean,
}

const elementProps = {
  style: {minHeight: 31.2 + 'px'},
}

const TopLineToolbarComponent = (
  {
    isPairSelectorEnabled = true,
    isMarketSelectorEnabled = true,
    isMarketConfiguratorEnabled = true,
    isCandleStorageSelectorEnabled = true,
    isOrderStorageSelectorEnabled = true,
    isOrderClearButtonEnabled = true,
    isIntervalSelectorEnabled = true,
    isStrategySelectorEnabled = true,
    isStrategyConfiguratorEnabled = true,
    isRunStrategyButtonEnabled = true,
  }: TopLineAllToolbarComponentProps) => {
  return <div style={{marginBottom: 15 + 'px'}}>
    <Flex>
      <Box>
        <Flex column style={{minWidth: '270px'}}>
          <Box {...elementProps}>{isPairSelectorEnabled && <SelectPairContainer/>}</Box>
          <Flex>
            <Box {...elementProps}>{isMarketSelectorEnabled && <SelectMarketContainer/>}</Box>
            <Box {...elementProps}>{isMarketConfiguratorEnabled && <MarketConfigurationContainer/>}</Box>
          </Flex>
        </Flex>
      </Box>
      <Box {...elementProps}>
        <Flex column style={{minWidth: '270px'}}>
          <Box {...elementProps}>{isCandleStorageSelectorEnabled && <SelectCandleStorageContainer/>}</Box>
          <Box>
            <Flex>
              <Box {...elementProps}>{isOrderStorageSelectorEnabled && <SelectOrderStorageContainer/>}</Box>
              <Box {...elementProps}>{isOrderClearButtonEnabled && <CleanOrderStorageButtonContainer/>}</Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box {...elementProps}>
        <Flex column>
          <Box {...elementProps}>{isIntervalSelectorEnabled && <SelectIntervalContainer/>}</Box>
          <Box {...elementProps}>
            <Flex>
              <Box {...elementProps}>{isStrategySelectorEnabled && <SelectStrategyContainer/>}</Box>
              <Box {...elementProps}>{isStrategyConfiguratorEnabled && <StrategyConfigurationContainer/>}</Box>
              <Box {...elementProps}>{isRunStrategyButtonEnabled && <RunStrategyButtonContainer/>}</Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </div>
}
export type {
  TopLineAllToolbarComponentProps
}

export {
  TopLineToolbarComponent,
}
