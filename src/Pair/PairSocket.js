// @flow
import type {AppSocket} from "../Sockets/socket"
import {SOCKET_EVENT_GET_PAIRS} from "../Sockets/SocketEvents"
import loadDataForSelectElementStore from "../Sockets/SynchronousDataLoader"
import type {SelectElement} from "../Form/Select/SelectComponent"

type RawPair = {
  key: string,
  name: string,
}

type PairHashMap = { [key: string ]: SelectElement }

class PairSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadPairs = (
    marketName: string,
    marketPluginName: string,
    processPairs: (pairs: Array<SelectElement>) => void
  ): PairHashMap => {
    loadDataForSelectElementStore(
      this.socket,
      SOCKET_EVENT_GET_PAIRS,
      (rawPair: RawPair): SelectElement => {
        return {key: rawPair.key, title: rawPair.name}
      },
      processPairs,
      {
        'market_name': marketName,
        'market_plugin_name': marketPluginName,
      },
    )
  }

}

export type {
  PairHashMap,
}
export {
  PairSocket,
}
