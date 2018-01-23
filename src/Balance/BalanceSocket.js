// @flow
import {AppSocket} from "../Sockets/socket"
import {SOCKET_EVENT_GET_BALANCE} from "../Sockets/SocketEvents"
import {Balance} from "./Balance"

type ProcessBalanceCallbackType = (balances: Array<Balance>) => void

type RawBalance = {
  currency: string,
  available_amount: string,
}

class BalanceSocket {
  socket: AppSocket

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  loadBalances = (marketName: string, processBalances: ProcessBalanceCallbackType): void => {
    const method = SOCKET_EVENT_GET_BALANCE

    this.socket.emit(method, {market_name: marketName}, (status: String, rawBalances: Array<RawBalance>) => {
      console.log('Received:', method, Object.values(rawBalances).length)

      const balances = rawBalances.map((rawBalance: RawBalance): Balance => {
        return new Balance(rawBalance.currency, rawBalance.available_amount)
      })

      processBalances(balances)
    })
  }
}


export {
  BalanceSocket,
}
