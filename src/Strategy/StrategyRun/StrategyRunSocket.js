// @flow
import {AppSocket} from "../../Sockets/socket"
import {SOCKET_EVENT_GET_STRATEGY_RUNS} from "../../Sockets/SocketEvents"
import {StrategyRun} from "./StrategyRun"
import type {RawInterval} from "../../Interval/Interval"
import {deserialize_interval} from "../../Interval/Interval"

type RawStrategyRun = {
  strategy_run_id: string,
  run_at: string,
  pair: string,
  markets: string,
  strategy_name: string,
  strategy_configuration: string,
  interval: RawInterval,
  candle_storage_name: string,
  order_storage_name: string,
}

class StrategyRunSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadStrategyRuns = (processStrategyRuns: (strategyRuns: Array<StrategyRun>) => void) => {
    const method = SOCKET_EVENT_GET_STRATEGY_RUNS
    this.socket.emit(method, {}, (status: String, rawStrategyRuns: Array<Object>) => {
      console.log('Received:', method, rawStrategyRuns.length)
      const strategyRuns = rawStrategyRuns.map(this.createStrategyRunFromRaw)
      processStrategyRuns(strategyRuns)
    })
  }

  createStrategyRunFromRaw = (rawStrategyRun: RawStrategyRun): StrategyRun => {
    return new StrategyRun(
      rawStrategyRun.strategy_run_id,
      new Date(Date.parse(rawStrategyRun.run_at)),
      rawStrategyRun.pair,
      rawStrategyRun.markets,
      rawStrategyRun.strategy_name,
      rawStrategyRun.strategy_configuration,
      deserialize_interval(rawStrategyRun.interval),
      rawStrategyRun.candle_storage_name,
      rawStrategyRun.order_storage_name
    )
  }
}

export {
  StrategyRunSocket,
}
