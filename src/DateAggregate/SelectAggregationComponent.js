// @flow
import React from "react"
import {SelectComponent, SelectItemsType, SelectElement} from "../Form/Select/SelectComponent"

type Props = {
  onSelect: (aggregation: string) => void,
  defaultSelectedAggregation: string,
}

const SelectAggregationComponent = ({availableMarkets, defaultSelectedAggregation, onSelect}: Props) => {
  const availableAggregations: SelectItemsType = {
    '1-minute': {key: '1-minute', title: '1 minute'},
    '5-minute': {key: '5-minute', title: '5 minutes'},
    '15-minute': {key: '15-minute', title: '15 minutes'},
    '30-minute': {key: '30-minute', title: '30 minutes'},
    '1-hour': {key: '1-hour', title: '1 hour'},
    '6-hours': {key: '6-hours', title: '6 hours'},
    '12-hours': {key: '12-hours', title: '12 hours'},
    '1-day': {key: '1-day', title: '1 day'},
  }

  console.log(defaultSelectedAggregation)

  const item = availableAggregations[defaultSelectedAggregation]
  return <SelectComponent
    label="Chart"
    items={availableAggregations}
    selectedItem={item || null}
    onChange={(market: SelectElement) => onSelect(market.key)}
  />
}

export default SelectAggregationComponent
