// @flow
import {AppSocket} from "../../Sockets/socket"
import {SOCKET_EVENT_GET_ORDER_STORAGES} from "../../Sockets/SocketEvents"
import {convertKeyToName} from "../../Strings"
import loadDataForSelectElementStore from "../../Sockets/SynchronousDataLoader"
import {SelectElement} from "../../Form/Select/SelectComponent"

type RawOrderStorage = {
  name: string,
}

type OrderStorageHashMap = { [key: string ]: SelectElement }

class OrderStorageSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadOrderStorages = (processOrderStorages: (orderStorages: Array<SelectElement>) => void): OrderStorageHashMap => {
    loadDataForSelectElementStore(
      this.socket,
      SOCKET_EVENT_GET_ORDER_STORAGES,
      (rawOrderStorage: RawOrderStorage): SelectElement => {
        return {key: rawOrderStorage.name, title: convertKeyToName(rawOrderStorage.name)}
      },
      processOrderStorages
    )
  }
}

export type {
  OrderStorageHashMap,
}
export {
  OrderStorageSocket,
}
