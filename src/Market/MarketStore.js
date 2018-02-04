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

  reloadData = action((marketPlugin: string, onSuccess: () => void): void => {
    this.marketSocket.loadMarkets(marketPlugin, (markets: Array<Market>) => {
      this.setMarkets(markets)
      onSuccess()
    })
  })

  setMarkets = action((markets: Array<Market>): void => {
    this.markets.clear()
    markets.forEach((market: Market) => {
      this.markets.set(market.name, market)
    })
  })

  changeMarketConfigurationField = action((marketName: string, key: string, value: string) => {
    const market = this.markets.get(marketName)
    if (market === undefined) {
      throw Error(`Market ${marketName} not in store.`)
    }
    market.setConfigurationField(key, value)
  })

  resetConfigurationValuesToDefault = action((market: string) => {
    this.markets.get(market).resetConfigurationToDefault()
  })

  hasAnyMarket = (): boolean => this.markets.size > 0

  getFirstMarket = (): Market => Object.values(this.markets.toJS())[0]
}

export {
  MarketStore,
}
