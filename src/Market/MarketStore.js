import {MarketSocket, marketSocketInstance} from "./MarketSocket"
import {action, extendObservable} from "mobx"
import {MarketHashMap} from "./MarketSocket"

class MarketStore {

  markets: MarketHashMap
  marketSocket: MarketSocket

  constructor(marketSocket: MarketSocket) {
    this.marketSocket = marketSocket
    extendObservable(this, {markets: {}})
  }

  reloadData = action((): void => {
    this.marketSocket.loadMarkets(this.setMarkets)
  })

  setMarkets = action((markets: MarketHashMap): void => {
    this.markets = markets
  })
}

const marketStoreInstance: MarketStore = new MarketStore(marketSocketInstance)

export {
  MarketStore,
  marketStoreInstance,
}
