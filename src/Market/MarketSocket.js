import {AppSocket, socket} from "../Sockets/socket"
import {SelectElement} from "../SelectComponent"
import {SOCKET_EVENT_GET_MARKETS} from "../Sockets/SocketEvents"
import {upperCaseFirst} from "../Strings"
import loadDataForSelectElementStore from "../Sockets/SynchronousDataLoader"

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
    loadDataForSelectElementStore(
      this.socket,
      SOCKET_EVENT_GET_MARKETS,
      (rawMarket: RawMarket): SelectElement => {
        return {key: rawMarket.name, title: upperCaseFirst(rawMarket.name)}
      },
      processMarkets
    )
  }
}

const marketSocketInstance: MarketSocket = new MarketSocket(socket)

export {
  MarketSocket,
  marketSocketInstance,
  MarketHashMap,
}
