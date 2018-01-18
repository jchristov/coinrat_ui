// @flow
import {AppSocket, socket} from "../Sockets/socket"
import {SOCKET_EVENT_GET_PAIRS} from "../Sockets/SocketEvents"
import loadDataForSelectElementStore from "../Sockets/SynchronousDataLoader"
import {SelectElement} from "../Form/Select/SelectComponent"

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

  loadPairs = (marketName: string, processPairs: (pairs: Array<SelectElement>) => void): PairHashMap => {
    loadDataForSelectElementStore(
      this.socket,
      SOCKET_EVENT_GET_PAIRS,
      (rawPair: RawPair): SelectElement => {
        return {key: rawPair.key, title: rawPair.name}
      },
      processPairs,
      {'market_name': marketName},
    )
  }

}

const pairSocketInstance: PairSocket = new PairSocket(socket)

export {
  PairSocket,
  pairSocketInstance,
  PairHashMap,
}
