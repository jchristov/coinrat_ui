// @flow
import React from "react"
import {SelectComponent} from "../SelectComponent"
import type {DefaultSelectDataType, SelectElement} from "../SelectComponent"

type Props = {
  availableStorages: DefaultSelectDataType,
  onSelect: (candleStorage: string) => void,
  defaultSelectedPair: string,
}

const SelectCandlesBackendStorageComponent = ({availableStorages, defaultSelectedCandleStorage, onSelect}: Props) => {
  const item = availableStorages[defaultSelectedCandleStorage]
  return <SelectComponent
    label="Candle storage"
    items={availableStorages}
    selectedItem={item}
    onChange={(candleStorage: SelectElement) => onSelect(candleStorage.key)}
  />
}

export default SelectCandlesBackendStorageComponent
