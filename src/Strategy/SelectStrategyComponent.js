// @flow
import React from "react"
import {SelectComponent, SelectItemsType, SelectElement} from "../Form/Select/SelectComponent"

type Props = {
  availableStrategies: SelectItemsType,
  onSelect: (strategy: string) => void,
  defaultSelectedStrategy: string,
}

const SelectStrategyComponent = ({availableStrategies, defaultSelectedStrategy, onSelect}: Props) => {
  const item = availableStrategies[defaultSelectedStrategy]
  return <SelectComponent
    label="Strategy"
    items={availableStrategies}
    selectedItem={item || null}
    isLoading={!item}
    onChange={(strategy: SelectElement) => onSelect(strategy.key)}
  />
}

export default SelectStrategyComponent
