// @flow
import {AppSocket} from "../../Sockets/socket"
import {
  SOCKET_EVENT_GET_STRATEGY_RUNS,
  SOCKET_EVENT_NEW_STRATEGY_RUN,
  SOCKET_EVENT_SUBSCRIBE,
  SOCKET_EVENT_UNSUBSCRIBE,
  SUBSCRIBED_EVENT_NEW_STRATEGY_RUN
} from "../../Sockets/SocketEvents"
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

  registerNewStrategyRunEvent(processStrategyRuns: (strategyRun: Array<StrategyRun>) => void) {
    this.socket.socketio.on(SOCKET_EVENT_NEW_STRATEGY_RUN, (rawStrategyRun: RawStrategyRun) => {
      StrategyRunSocket.processStrategyRuns([rawStrategyRun], processStrategyRuns)
    })
  }

  loadStrategyRuns = (processStrategyRuns: (strategyRuns: Array<StrategyRun>) => void) => {
    this.socket.emit(SOCKET_EVENT_GET_STRATEGY_RUNS, {}, (status: String, rawStrategyRuns: Array<Object>) => {
      StrategyRunSocket.processStrategyRuns(rawStrategyRuns, processStrategyRuns)
      this.subscribeToStrategyRunsFeed()
    })
  }

  subscribeToStrategyRunsFeed() {
    this.socket.emit(
      SOCKET_EVENT_UNSUBSCRIBE,
      {event: SUBSCRIBED_EVENT_NEW_STRATEGY_RUN},
      () => {
        this.socket.emit(SOCKET_EVENT_SUBSCRIBE, {event: SUBSCRIBED_EVENT_NEW_STRATEGY_RUN})
      })
  }

  static processStrategyRuns(
    rawStrategyRuns: Array<RawStrategyRun>,
    processStrategyRuns: (strategyRuns: Array<StrategyRun>) => void
  ) {
    console.log('Received: STRATEGY_RUN', rawStrategyRuns.length)
    const strategyRuns = rawStrategyRuns.map(StrategyRunSocket.createStrategyRunFromRaw)
    processStrategyRuns(strategyRuns)
  }

  static createStrategyRunFromRaw = (rawStrategyRun: RawStrategyRun): StrategyRun => {
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
