// @flow
import {MarketSocket} from "./MarketSocket"
import {action, ObservableMap} from "mobx"
import {Market} from "./Market"

class MarketStore {

  markets: ObservableMap<Market>
  marketSocket: MarketSocket

  constructor(marketSocket: MarketSocket) {
    this.marketSocket = marketSocket
    this.markets = new ObservableMap()
  }

  reloadData = action((marketPluginName: string, onSuccess: () => void): void => {
    this.marketSocket.loadMarkets(marketPluginName, (markets: Array<Market>) => {
      this.setMarkets(marketPluginName, markets)
      onSuccess()
    })
  })

  setMarkets = action((marketPluginName: string, markets: Array<Market>): void => {
    markets.forEach((market: Market) => {
      this.markets.set(this.keyForMarket(marketPluginName, market.name), market)
    })
  })

  keyForMarket = (marketPluginName: string, marketName: string) => {
    return marketPluginName + '_' + marketName
  }

  changeMarketConfigurationField = action((
    marketPluginName: string,
    marketName: string,
    key: string,
    value: string
  ) => {
    const marketKey = this.keyForMarket(marketPluginName, marketName)
    const market = this.markets.get(marketKey)
    if (market === undefined) {
      console.log(this.markets.toJS())
      throw Error(`Plugin_Market ${marketKey} not in store.`)
    }
    market.setConfigurationField(key, value)
  })

  resetConfigurationValuesToDefault = action((marketPluginName: string, marketName: string) => {
    const marketKey = this.keyForMarket(marketPluginName, marketName)
    this.markets.get(marketKey).resetConfigurationToDefault()
  })

  hasAnyMarket = (): boolean => this.markets.size > 0

  getFirstMarket = (): Market => Object.values(this.markets.toJS())[0]
}

export {
  MarketStore,
}
