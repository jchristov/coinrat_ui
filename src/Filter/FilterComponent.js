import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import SelectIntervalComponent from "../Interval/SelectIntervalComponent"
import SelectOrdersBackendStorageComponent from "../OrdersBackandStorage/SelectOrdersBackendStorageComponent"
import SelectCandlesBackendStorageComponent from "../CandlesBackandStorage/SelectCandlesBackendStorageComponent"

const FilterComponent = observer(class FilterComponent extends Component {

  render() {
    return (
      <div>
        <SelectPairComponent store={this.props.store}/>
        <SelectMarketComponent store={this.props.store}/>
        <SelectIntervalComponent store={this.props.store}/>
        <SelectCandlesBackendStorageComponent store={this.props.store}/>
        <SelectOrdersBackendStorageComponent store={this.props.store}/>
      </div>
    )
  }

})

export default FilterComponent
