// @flow
import {MarketPluginSocket} from "./MarketPluginSocket"
import {action, extendObservable} from "mobx"
import {MarketPluginHashMap} from "./MarketPluginSocket"
import {Market} from "../Market/Market"

class MarketPluginStore {

  marketPlugins: MarketPluginHashMap
  marketPluginSocket: MarketPluginSocket

  constructor(marketPluginSocket: MarketPluginSocket) {
    this.marketPluginSocket = marketPluginSocket
    extendObservable(this, {marketPlugins: {}})
  }

  reloadData = action((onSuccess: () => void) => {
    this.marketPluginSocket.loadMarketPlugins((marketPlugins: MarketPluginHashMap) => {
      this.setMarketPlugins(marketPlugins)
      onSuccess()
    })
  })

  setMarketPlugins = action((marketPlugins: MarketPluginHashMap): void => {
    this.marketPlugins = marketPlugins
  })

  hasAnyMarketPlugin = () => Object.values(this.marketPlugins).length > 0

  getFirstMarketPluginName = (): Market => Object.keys(this.marketPlugins)[0]
}

export {
  MarketPluginStore,
}
