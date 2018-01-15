import {AppSocket, socket} from "../Sockets/socket"
import {SelectElement} from "../SelectComponent"
import {upperCaseFirst} from "../Strings"
import loadDataForSelectElementStore from "../Sockets/SynchronousDataLoader"
import {SOCKET_EVENT_GET_STRATEGIES} from "../Sockets/SocketEvents"

type RawStrategy = {
  name: string,
}

type StrategyHashMap = { [key: string ]: SelectElement }

class StrategySocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadStrategies = (processStrategies: (strategies: Array<SelectElement>) => void): StrategyHashMap => {
    loadDataForSelectElementStore(
      this.socket,
      SOCKET_EVENT_GET_STRATEGIES,
      (rawStrategy: RawStrategy): SelectElement => {
        return {key: rawStrategy.name, title: upperCaseFirst(rawStrategy.name)}
      },
      processStrategies
    )
  }

}

const strategySocketInstance: StrategySocket = new StrategySocket(socket)

export {
  StrategySocket,
  strategySocketInstance,
  StrategyHashMap,
}
