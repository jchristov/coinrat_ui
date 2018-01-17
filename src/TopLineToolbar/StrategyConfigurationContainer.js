import React, {Component} from "react"
import {observer} from "mobx-react"
import ConfigurationStructureComponent from "../ConfigurationStructure/ConfigurationStructureComponent"
import {filterStoreInstance} from "../TopLineToolbar/FilterStore"
import {strategyStoreInstance} from "../Strategy/StrategyStore"
import {Strategy} from "../Strategy/Strategy"

class StrategyConfigurationContainer extends Component<{}> {

  handleOnChange = (e) => {
    strategyStoreInstance.changeStrategyConfigurationField(filterStoreInstance.strategy, e.target.name, e.target.value)
  }

  handleReset = () => {
    strategyStoreInstance.resetConfigurationValuesToDefault(filterStoreInstance.strategy)
  }

  render = () => {
    const strategy: Strategy = strategyStoreInstance.strategies.get(filterStoreInstance.strategy)
    if (strategy === undefined) {
      return null
    }

    return <ConfigurationStructureComponent
      configurationStructure={strategy.configurationStructure}
      onChange={this.handleOnChange}
      onReset={this.handleReset}
    />
  }
}

export default observer(StrategyConfigurationContainer)
