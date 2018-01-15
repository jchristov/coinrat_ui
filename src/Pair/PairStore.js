import {PairSocket, pairSocketInstance} from "./PairSocket"
import {action, extendObservable} from "mobx"
import {PairHashMap} from "./PairSocket"

class PairStore {

  pairs: PairHashMap
  pairSocket: PairSocket

  constructor(pairSocket: PairSocket) {
    this.pairSocket = pairSocket
    extendObservable(this, {pairs: {}})
  }

  reloadData = action((marketName: string): void => {
    this.pairSocket.loadPairs(marketName, this.setPairs)
  })

  setPairs = action((pairs: PairHashMap): void => {
    this.pairs = pairs
  })
}

const pairStoreInstance: PairStore = new PairStore(pairSocketInstance)

export {
  PairStore,
  pairStoreInstance,
}
