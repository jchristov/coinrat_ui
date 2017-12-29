import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import SelectIntervalComponent from "../Interval/SelectIntervalComponent"
import SelectOrdersBackendStorageComponent from "../OrdersBackandStorage/SelectOrdersBackendStorageComponent"
import SelectCandlesBackendStorageComponent from "../CandlesBackandStorage/SelectCandlesBackendStorageComponent"
import SelectStrategyComponent from "../Strategy/SelectStrategyComponent"
import RunStrategyButtonComponent from "../Strategy/RunStrategyButtonComponent"
import CleanOrderStorageButtonComponent from "../Orders/CleanOrderStorageButtonComponent"

const TopLineToolbarComponent = observer(class FilterComponent extends Component {

  render() {
    return (
      <div>
        <SelectPairComponent store={this.props.store}/>
        <SelectMarketComponent store={this.props.store}/>
        <SelectIntervalComponent store={this.props.store}/>
        <SelectCandlesBackendStorageComponent store={this.props.store}/>
        <SelectOrdersBackendStorageComponent store={this.props.store}/>
        <CleanOrderStorageButtonComponent/>
        <SelectStrategyComponent store={this.props.store}/>
        <RunStrategyButtonComponent/>
      </div>
    )
  }

})

export default TopLineToolbarComponent
