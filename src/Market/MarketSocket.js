import {AppSocket, socket} from "../Sockets/socket"
import {SOCKET_EVENT_GET_MARKETS} from "../Sockets/SocketEvents"
import {convertKeyToName} from "../Strings"
import loadDataForSelectElementStore from "../Sockets/SynchronousDataLoader"
import {SelectElement} from "../Select/SelectComponent"

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
        return {key: rawMarket.name, title: convertKeyToName(rawMarket.name)}
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
