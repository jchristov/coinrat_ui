// @flow
import React from "react"
import {SelectComponent} from "../../SelectComponent"
import type {DefaultSelectDataType, SelectElement} from "../../SelectComponent"

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
