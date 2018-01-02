// @flow
import React from "react"
import {SelectComponent, SelectElement} from "../SelectComponent"
import type {DefaultSelectDataType} from "../SelectComponent"

type Props = {
  availableStrategies: DefaultSelectDataType,
  onSelect: (strategy: string) => void,
  defaultSelectedStrategy: string,
}

const SelectStrategyComponent = ({availableStrategies, defaultSelectedStrategy, onSelect}: Props) => {
  const item = availableStrategies[defaultSelectedStrategy]
  return <SelectComponent
    label="Strategy"
    items={availableStrategies}
    selectedItem={item}
    onChange={(strategy: SelectElement) => onSelect(strategy.key)}
  />
}

export default SelectStrategyComponent
