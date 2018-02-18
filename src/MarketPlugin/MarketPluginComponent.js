// @flow
import React from "react"
import {SelectComponent, SelectItemsType, SelectElement} from "../Form/Select/SelectComponent"

type Props = {
  availableMarketPlugins: SelectItemsType,
  onSelect: (marketPlugin: string) => void,
  defaultSelectedMarketPlugin: string,
  disabled?: boolean
}

const SelectMarketPluginComponent = (
  {
    availableMarketPlugins,
    defaultSelectedMarketPlugin,
    onSelect,
    disabled = false,
  }: Props) => {
  const item = availableMarketPlugins[defaultSelectedMarketPlugin]
  return <SelectComponent
    label="Market plugin"
    items={availableMarketPlugins}
    selectedItem={item || null}
    isLoading={!item}
    onChange={(marketPlugin: SelectElement) => onSelect(marketPlugin.key)}
    disabled={disabled}
  />
}

export default SelectMarketPluginComponent
