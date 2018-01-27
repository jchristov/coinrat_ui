// @flow
import React from "react"
import {SelectComponent} from "../../Form/Select/SelectComponent"
import type {SelectElement, SelectItemsType} from "../../Form/Select/SelectComponent"

type Props = {
  onSelect: (aggregation: string) => void,
  defaultSelectedAggregation: string,
}

const CandleSizeSelectComponent = ({availableMarkets, defaultSelectedAggregation, onSelect}: Props) => {
  const availableAggregations: SelectItemsType = {
    '1-minute': {key: '1-minute', title: '1 minute'},
    '5-minute': {key: '5-minute', title: '5 minutes'},
    '15-minute': {key: '15-minute', title: '15 minutes'},
    '30-minute': {key: '30-minute', title: '30 minutes'},
    '1-hour': {key: '1-hour', title: '1 hour'},
    '2-hour': {key: '2-hour', title: '2 hours'},
    '3-hour': {key: '3-hour', title: '3 hours'},
    '4-hour': {key: '4-hour', title: '4 hours'},
    '6-hour': {key: '6-hour', title: '6 hours'},
    '12-hour': {key: '12-hour', title: '12 hours'},
    '1-day': {key: '1-day', title: '1 day'},
    '7-day': {key: '7-day', title: '7 days'},
  }

  const item = availableAggregations[defaultSelectedAggregation]
  return <SelectComponent
    label="Chart"
    items={availableAggregations}
    selectedItem={item || null}
    onChange={(market: SelectElement) => onSelect(market.key)}
  />
}

export default CandleSizeSelectComponent
