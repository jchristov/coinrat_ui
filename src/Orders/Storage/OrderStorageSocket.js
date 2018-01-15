import {AppSocket, socket} from "../../Sockets/socket"
import {SelectElement} from "../../SelectComponent"
import {SOCKET_EVENT_GET_ORDER_STORAGES} from "../../Sockets/SocketEvents"
import {upperCaseFirst} from "../../Strings"
import loadDataForSelectElementStore from "../../Strategy/SynchronousDataLoader"

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
        return {key: rawOrderStorage.name, title: upperCaseFirst(rawOrderStorage.name)}
      },
      processOrderStorages
    )
  }

}

const orderStorageSocketInstance: OrderStorageSocket = new OrderStorageSocket(socket)

export {
  OrderStorageSocket,
  orderStorageSocketInstance,
  OrderStorageHashMap,
}
