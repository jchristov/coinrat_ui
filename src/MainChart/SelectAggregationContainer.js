// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectAggregationComponent from "../DateAggregate/SelectAggregationComponent"
import {AGGREGATION_UNIT, aggregationStoreInstance} from "../DateAggregate/AggregationStore"

class SelectAggregationContainer extends Component<{}> {

  changeAggregation = (aggregationString: string) => {
    const [rawSize, rawUnit]: [AGGREGATION_UNIT, string] = aggregationString.split('-')
    aggregationStoreInstance.setAggregation(rawUnit, Number(rawSize))
  }

  render = () => {
    const selectedAggregationKey = aggregationStoreInstance.aggregationSize + '-' + aggregationStoreInstance.unit
    return <SelectAggregationComponent
      defaultSelectedAggregation={selectedAggregationKey}
      onSelect={this.changeAggregation}
    />
  }

}

export default observer(SelectAggregationContainer)
