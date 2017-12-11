import {socket} from "../Sockets/socket"
import {extendObservable} from "mobx"

class CandleStickStore {
 constructor() {
  extendObservable(this, {
   isOnline: false
  })

  socket.on('connect', () => {
   this.isOnline = true
  })
  socket.on('disconnect', () => {
   this.isOnline = false
  })
 }

}

const candleStickStore = new CandleStickStore()

export default candleStickStore
