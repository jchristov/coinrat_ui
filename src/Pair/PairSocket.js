import {AppSocket, socket} from "../Sockets/socket"
import {SelectElement} from "../SelectComponent"
import {SOCKET_EVENT_GET_MARKETS, SOCKET_EVENT_GET_PAIRS} from "../Sockets/SocketEvents"
import {upperCaseFirst} from "../Strings"

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
    this.socket.emit(
      SOCKET_EVENT_GET_PAIRS,
      {'market_name': marketName},
      (status: String, rawPairs: Array<RawPair>) => {
        console.log(rawPairs)
        console.log('Received PAIRS', Object.values(rawPairs).length, 'pairs!')
        const array = PairSocket.parsePairDataIntoStateObject(rawPairs)
        processPairs(array.reduce((result: PairHashMap, item: SelectElement) => ({...result, [item.key]: item}), {}))
      }
    )
  }

  static parsePairDataIntoStateObject(rawPairs: Array<RawPair>): Array<SelectElement> {
    return rawPairs.map((rawPair: RawPair) => PairSocket.parseOnePairFromData(rawPair))
  }

  static parseOnePairFromData(rawPair: RawPair): SelectElement {
    return {key: rawPair.key, title: rawPair.name}
  }

}

const pairSocketInstance: PairSocket = new PairSocket(socket)

export {
  PairSocket,
  pairSocketInstance,
  PairHashMap,
}
