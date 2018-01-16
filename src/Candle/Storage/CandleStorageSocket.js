import {AppSocket, socket} from "../../Sockets/socket"
import {upperCaseFirst} from "../../Strings"
import {SOCKET_EVENT_GET_CANDLE_STORAGES} from "../../Sockets/SocketEvents"
import loadDataForSelectElementStore from "../../Sockets/SynchronousDataLoader"
import {SelectElement} from "../../Select/SelectComponent"

type RawCandleStorage = {
  name: string,
}

type CandleStorageHashMap = { [key: string ]: SelectElement }

class CandleStorageSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadCandleStorages = (processCandleStorages: (candleStorages: Array<SelectElement>) => void): CandleStorageHashMap => {
    loadDataForSelectElementStore(
      this.socket,
      SOCKET_EVENT_GET_CANDLE_STORAGES,
      (rawCandleStorage: RawCandleStorage): SelectElement => {
        return {key: rawCandleStorage.name, title: upperCaseFirst(rawCandleStorage.name)}
      },
      processCandleStorages
    )
  }

}

const candleStorageSocketInstance: CandleStorageSocket = new CandleStorageSocket(socket)

export {
  CandleStorageSocket,
  candleStorageSocketInstance,
  CandleStorageHashMap,
}
