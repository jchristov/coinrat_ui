// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import SelectIntervalComponent from "../Interval/SelectIntervalComponent"
import SelectStrategyComponent from "../Strategy/SelectStrategyComponent"
import RunStrategyButtonComponent from "../Strategy/RunStrategyButtonComponent"
import CleanOrderStorageButtonComponent from "../Orders/CleanOrderStorageButtonComponent"
import SelectOrdersBackendStorageComponent from "../Orders/SelectOrdersBackendStorageComponent"
import SelectCandlesBackendStorageComponent from "../Candle/SelectCandlesBackendStorageComponent"
import {strategyRunnerStoreInstance} from "../Strategy/StrategyRunnerStore"
import {FilterStore} from "./FilterStore"
import {OrderStore} from "../Orders/OrderStore"

type Props = {
  filterStore: FilterStore,
  orderStore: OrderStore,
}

const TopLineToolbarComponent = observer(class FilterComponent extends Component<Props> {
  props: Props

  render() {
    return (
      <div>
        <div>
          <SelectPairComponent store={this.props.filterStore}/>
          <SelectMarketComponent store={this.props.filterStore}/>
          <SelectIntervalComponent store={this.props.filterStore}/>
        </div>
        <div>
          <SelectCandlesBackendStorageComponent store={this.props.filterStore}/>
        </div>
        <div>
          <SelectOrdersBackendStorageComponent store={this.props.filterStore}/>
          <CleanOrderStorageButtonComponent store={this.props.orderStore}/>
        </div>
        <div>
          <SelectStrategyComponent store={this.props.filterStore}/>
          <RunStrategyButtonComponent store={strategyRunnerStoreInstance}/>
        </div>
      </div>
    )
  }

})

export default TopLineToolbarComponent
