import React, {Component} from "react"
import ConfigurationStructureComponent from "../ConfigurationStructure/ConfigurationStructureComponent"
import {observer} from "mobx-react/index"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {strategyStoreInstance} from "../Strategy/StrategyStore"
import {Strategy} from "../Strategy/Strategy"

class StrategyConfigurationContainer extends Component<{}> {

  render = () => {
    const strategy: Strategy = strategyStoreInstance.strategies[filterStoreInstance.strategy]
    if (strategy === undefined) {
      return null
    }

    return <ConfigurationStructureComponent configurationStructure={strategy.configurationStructure}/>
  }
}

export default observer(StrategyConfigurationContainer)
