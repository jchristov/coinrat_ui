// @flow
import React from 'react'
import {Box, Flex} from "reflexbox"
import SelectPairContainer from "./SelectPairContainer"
import SelectMarketContainer from "./SelectMarketContainer"
import SelectOrderStorageContainer from "./SelectOrderStorageContainer"
import CleanOrderStorageButtonContainer from "./CleanOrderStorageButtonContainer"

const TopLineOrdersToolbarComponent = () => {
  return <div>
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
    </Flex>
  </div>
}

export default TopLineOrdersToolbarComponent
