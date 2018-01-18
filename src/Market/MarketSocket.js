// @flow
import {AppSocket, socket} from "../Sockets/socket"
import {SOCKET_EVENT_GET_MARKETS} from "../Sockets/SocketEvents"
import {convertKeyToName} from "../Strings"
import {Market} from "./Market"
import {createConfigurationStructureFromRawData} from "../ConfigurationStructure/ConfigurationStructure"

type ProcessMarketsCallbackType = (markets: Array<Market>) => void

type RawMarket = {
  name: string,
  configuration_structure: Object,
}

class MarketSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadMarkets = (processMarkets: ProcessMarketsCallbackType): void => {
    const method = SOCKET_EVENT_GET_MARKETS

    this.socket.emit(method, {}, (status: String, rawMarkets: Array<RawMarket>) => {
      console.log('Received:', method, Object.values(rawMarkets).length)

      const markets = rawMarkets.map((rawMarket: RawMarket): Market => {
        const configurationStructure = createConfigurationStructureFromRawData(rawMarket.configuration_structure)
        return new Market(rawMarket.name, convertKeyToName(rawMarket.name), configurationStructure)
      })

      processMarkets(markets)
    })
  }
}

const marketSocketInstance: MarketSocket = new MarketSocket(socket)

export {
  MarketSocket,
  marketSocketInstance,
}
