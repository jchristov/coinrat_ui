import {AppSocket, socket} from "../../Sockets/socket"
import {convertKeyToName} from "../../Strings"
import {SOCKET_EVENT_GET_CANDLE_STORAGES} from "../../Sockets/SocketEvents"
import loadDataForSelectElementStore from "../../Sockets/SynchronousDataLoader"
import {SelectElement} from "../../Form/Select/SelectComponent"

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
        return {key: rawCandleStorage.name, title: convertKeyToName(rawCandleStorage.name)}
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
