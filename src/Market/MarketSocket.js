import {AppSocket, socket} from "../Sockets/socket"
import {SelectElement} from "../SelectComponent"
import {SOCKET_EVENT_GET_MARKETS} from "../Sockets/SocketEvents"
import {upperCaseFirst} from "../Strings"

type RawMarket = {
  name: string,
}

type MarketHashMap = { [key: string ]: SelectElement }

class MarketSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadMarkets = (processMarkets: (markets: Array<SelectElement>) => void): MarketHashMap => {
    this.socket.emit(SOCKET_EVENT_GET_MARKETS, {}, (status: String, rawMarkets: Array<RawMarket>) => {
      console.log('Received MARKETS', Object.values(rawMarkets).length, 'markets!')
      processMarkets(MarketSocket.parseMarketDataIntoStateObject(rawMarkets))
    })
  }

  static parseMarketDataIntoStateObject(rawMarkets: Array<RawMarket>): Array<market> {
    return rawMarkets.map((rawMarket: RawMarket) => MarketSocket.parseOneMarketFromData(rawMarket))
  }

  static parseOneMarketFromData(rawMarket: RawMarket): SelectElement {
    return {key: rawMarket.name, title: upperCaseFirst(rawMarket.name)}
  }

}

const marketSocketInstance: MarketSocket = new MarketSocket(socket)

export {
  MarketSocket,
  marketSocketInstance,
  MarketHashMap,
}
