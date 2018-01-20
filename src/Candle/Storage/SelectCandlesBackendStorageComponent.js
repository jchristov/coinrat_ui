// @flow
import React from "react"
import {SelectItemsType, SelectElement, SelectComponent} from "../../Form/Select/SelectComponent"

type Props = {
  availableStorages: SelectItemsType,
  onSelect: (candleStorage: string) => void,
  defaultSelectedPair: string,
}

const SelectCandlesBackendStorageComponent = ({availableStorages, defaultSelectedCandleStorage, onSelect}: Props) => {
  const item = availableStorages[defaultSelectedCandleStorage]
  return <SelectComponent
    label="Candle storage"
    items={availableStorages}
    selectedItem={item || null}
    onChange={(candleStorage: SelectElement) => onSelect(candleStorage.key)}
  />
}

export default SelectCandlesBackendStorageComponent
