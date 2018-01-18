// @flow
import {AppSocket, socket} from "../Sockets/socket"
import {convertKeyToName} from "../Strings"
import {SOCKET_EVENT_GET_STRATEGIES} from "../Sockets/SocketEvents"
import {Strategy} from "./Strategy"
import {createConfigurationStructureFromRawData} from "../ConfigurationStructure/ConfigurationStructure"

type ProcessStrategiesCallbackType = (markets: Array<Strategy>) => void

type RawStrategy = {
  name: string,
  configuration_structure: Object,
}

class StrategySocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadStrategies = (processStrategies: ProcessStrategiesCallbackType): void => {
    const method = SOCKET_EVENT_GET_STRATEGIES

    this.socket.emit(method, {}, (status: String, rawStrategies: Array<RawStrategy>) => {
      console.log('Received:', method, Object.values(rawStrategies).length)

      const strategies = rawStrategies.map((rawStrategy: RawStrategy): Strategy => {
        const configurationStructure = createConfigurationStructureFromRawData(rawStrategy.configuration_structure)
        return new Strategy(rawStrategy.name, convertKeyToName(rawStrategy.name), configurationStructure)
      })

      processStrategies(strategies)
    })
  }

}

const strategySocketInstance: StrategySocket = new StrategySocket(socket)

export {
  StrategySocket,
  strategySocketInstance,
}
