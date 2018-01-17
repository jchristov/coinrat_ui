// @flow
import React from "react"
import {SelectComponent, DefaultSelectDataType, SelectElement} from "../Form/Select/SelectComponent"

type Props = {
  availableMarkets: DefaultSelectDataType,
  onSelect: (market: string) => void,
  defaultSelectedMarket: string,
}

const SelectMarketComponent = ({availableMarkets, defaultSelectedMarket, onSelect}: Props) => {
  const item = availableMarkets[defaultSelectedMarket]
  return <SelectComponent
    label="Market"
    items={availableMarkets}
    selectedItem={item || null}
    onChange={(market: SelectElement) => onSelect(market.key)}
  />
}

export default SelectMarketComponent
