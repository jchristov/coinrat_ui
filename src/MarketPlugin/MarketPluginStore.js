// @flow
import {MarketPluginSocket} from "./MarketPluginSocket"
import {action, extendObservable} from "mobx"
import {MarketPluginHashMap} from "./MarketPluginSocket"

class MarketPluginStore {

  marketPlugins: MarketPluginHashMap
  marketPluginSocket: MarketPluginSocket

  constructor(marketPluginSocket: MarketPluginSocket) {
    this.marketPluginSocket = marketPluginSocket
    extendObservable(this, {marketPlugins: {}})
  }

  reloadData = action(() => {
    this.marketPluginSocket.loadMarketPlugins(this.setMarketPlugins)
  })

  setMarketPlugins = action((marketPlugins: MarketPluginHashMap): void => {
    this.marketPlugins = marketPlugins
  })
}

export {
  MarketPluginStore,
}
