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

const TopLineAllToolbarComponent = () => {
  return <div>
    <Flex>
      <Box>
        <Flex column>
          <Box><SelectPairContainer/></Box>
          <Flex>
            <Box><SelectMarketContainer/></Box>
            <Box><MarketConfigurationContainer/></Box>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Flex column>
          <Box><SelectCandleStorageContainer/></Box>
          <Box>
            <Flex>
              <Box><SelectOrderStorageContainer/></Box>
              <Box><CleanOrderStorageButtonContainer/></Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Flex column>
          <Box><SelectIntervalContainer/></Box>
          <Box>
            <Flex>
              <Box><SelectStrategyContainer/></Box>
              <Box><StrategyConfigurationContainer/></Box>
              <Box><RunStrategyButtonContainer/></Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </div>
}

export default TopLineAllToolbarComponent
