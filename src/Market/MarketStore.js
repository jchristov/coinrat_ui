// @flow
import {MarketSocket, marketSocketInstance} from "./MarketSocket"
import {action, ObservableMap} from "mobx"
import {Market} from "./Market"

class MarketStore {

  markets: ObservableMap<Market>
  marketSocket: MarketSocket

  constructor(marketSocket: MarketSocket) {
    this.marketSocket = marketSocket
    this.markets = new ObservableMap()
  }

  reloadData = action((): void => {
    this.marketSocket.loadMarkets(this.setMarkets)
  })

  setMarkets = action((markets: Array<Market>): void => {
    this.markets.clear()
    markets.forEach((market: Market) => {
      this.markets.set(market.name, market)
    })
  })

  changeMarketConfigurationField = action((market: string, key: string, value: string) => {
    this.markets.get(market).setConfigurationField(key, value)
  })

  resetConfigurationValuesToDefault = action((market: string) => {
    this.markets.get(market).resetConfigurationToDefault()
  })
}

const marketStoreInstance: MarketStore = new MarketStore(marketSocketInstance)

export {
  MarketStore,
  marketStoreInstance,
}
