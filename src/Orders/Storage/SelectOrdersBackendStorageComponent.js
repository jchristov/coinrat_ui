// @flow
import React from "react"
import {SelectItemsType, SelectElement, SelectComponent} from "../../Form/Select/SelectComponent"

type Props = {
  availableStorages: SelectItemsType,
  onSelect: (candleStorage: string) => void,
  defaultSelectedOrderStorage: string,
}

const SelectOrderBackendStorageComponent = ({availableStorages, defaultSelectedOrderStorage, onSelect}: Props) => {
  const item = availableStorages[defaultSelectedOrderStorage]
  return <SelectComponent
    label="Order storage"
    items={availableStorages}
    selectedItem={item || null}
    isLoading={!item}
    onChange={(orderStorage: SelectElement) => onSelect(orderStorage.key)}
  />
}

export default SelectOrderBackendStorageComponent
