// @flow
import React from 'react'
import {Box, Flex} from "reflexbox"
import SelectPairContainer from "./SelectPairContainer"
import SelectMarketContainer from "./SelectMarketContainer"
import SelectOrderStorageContainer from "./SelectOrderStorageContainer"
import CleanOrderStorageButtonContainer from "./CleanOrderStorageButtonContainer"
import SelectIntervalContainer from "./SelectIntervalContainer"

const TopLineOrdersToolbarComponent = () => {
  return <div style={{marginBottom: 15 + 'px'}}>
    <Flex>
      <Box>
        <Flex column>
          <Box><SelectPairContainer/></Box>
          <Box><SelectMarketContainer/></Box>
        </Flex>
      </Box>
      <Box>
        <Flex column>
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
        </Flex>
      </Box>
    </Flex>
  </div>
}

export default TopLineOrdersToolbarComponent
