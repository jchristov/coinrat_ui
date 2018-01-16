// @flow
import React from "react"
import {DefaultSelectDataType, SelectElement, SelectComponent} from "../../Select/SelectComponent"

type Props = {
  availableStorages: DefaultSelectDataType,
  onSelect: (candleStorage: string) => void,
  defaultSelectedOrderStorage: string,
}

const SelectOrderBackendStorageComponent = ({availableStorages, defaultSelectedOrderStorage, onSelect}: Props) => {
  const item = availableStorages[defaultSelectedOrderStorage]
  return <SelectComponent
    label="Order storage"
    items={availableStorages}
    selectedItem={item || null}
    onChange={(orderStorage: SelectElement) => onSelect(orderStorage.key)}
  />
}

export default SelectOrderBackendStorageComponent
