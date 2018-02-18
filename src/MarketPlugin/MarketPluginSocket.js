// @flow
import type {AppSocket} from "../Sockets/socket"
import {SOCKET_EVENT_GET_MARKET_PLUGINS} from "../Sockets/SocketEvents"
import loadDataForSelectElementStore from "../Sockets/SynchronousDataLoader"
import type {SelectElement} from "../Form/Select/SelectComponent"
import {convertKeyToName} from "../Strings"

type RawMarketPlugin = {
  name: string,
}

type MarketPluginHashMap = { [key: string ]: SelectElement }

class MarketPluginSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadMarketPlugins = (processMarketPlugins: (pairs: Array<SelectElement>) => void): MarketPluginHashMap => {
    loadDataForSelectElementStore(
      this.socket,
      SOCKET_EVENT_GET_MARKET_PLUGINS,
      (rawMarketPlugin: RawMarketPlugin): SelectElement => {
        return {key: rawMarketPlugin.name, title: convertKeyToName(rawMarketPlugin.name)}
      },
      processMarketPlugins,
      {},
    )
  }

}

export type {
  MarketPluginHashMap,
}
export {
  MarketPluginSocket,
}
