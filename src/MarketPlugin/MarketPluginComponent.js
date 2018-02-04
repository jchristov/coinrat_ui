// @flow
import React from "react"
import {SelectComponent, SelectItemsType, SelectElement} from "../Form/Select/SelectComponent"

type Props = {
  availableMarketPlugins: SelectItemsType,
  onSelect: (marketPlugin: string) => void,
  defaultSelectedMarketPlugin: string,
}

const SelectMarketPluginComponent = ({availableMarketPlugins, defaultSelectedMarketPlugin, onSelect}: Props) => {
  const item = availableMarketPlugins[defaultSelectedMarketPlugin]
  return <SelectComponent
    label="Market plugin"
    items={availableMarketPlugins}
    selectedItem={item || null}
    isLoading={!item}
    onChange={(marketPlugin: SelectElement) => onSelect(marketPlugin.key)}
  />
}

export default SelectMarketPluginComponent
