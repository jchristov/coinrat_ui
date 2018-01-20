// @flow
import React from "react"
import {SelectComponent, SelectItemsType, SelectElement} from "../Form/Select/SelectComponent"

type Props = {
  availablePairs: SelectItemsType,
  onSelect: (pair: string) => void,
  defaultSelectedPair: string,
}

const SelectPairComponent = ({availablePairs, defaultSelectedPair, onSelect}: Props) => {
  const item = availablePairs[defaultSelectedPair]
  return <SelectComponent
    label="Pair"
    items={availablePairs}
    selectedItem={item || null}
    onChange={(pair: SelectElement) => onSelect(pair.key)}
  />
}

export default SelectPairComponent
