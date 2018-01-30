// @flow
import React from "react"
import {SelectComponent, SelectItemsType, SelectElement} from "../../Form/Select/SelectComponent"

type Props = {
  availableStrategyRuns: SelectItemsType,
  onSelect: (strategyRunId: string) => void,
  defaultSelectedStrategyRun: string,
  isLoading: boolean
}

const SelectStrategyRunComponent = ({availableStrategyRuns, defaultSelectedStrategyRun, onSelect, isLoading}: Props) => {
  const item = availableStrategyRuns[defaultSelectedStrategyRun]
  return <SelectComponent
    label="Strategy Run"
    items={availableStrategyRuns}
    selectedItem={item || null}
    isLoading={isLoading}
    onChange={(strategyRun: SelectElement) => onSelect(strategyRun.key)}
  />
}

export default SelectStrategyRunComponent
