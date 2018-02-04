// @flow
import {PairSocket} from "./PairSocket"
import {action, extendObservable} from "mobx"
import {PairHashMap} from "./PairSocket"

class PairStore {

  pairs: PairHashMap
  pairSocket: PairSocket

  constructor(pairSocket: PairSocket) {
    this.pairSocket = pairSocket
    extendObservable(this, {pairs: {}})
  }

  reloadData = action((marketName: string, marketPluginName: string): void => {
    this.pairSocket.loadPairs(marketName, marketPluginName, this.setPairs)
  })

  setPairs = action((pairs: PairHashMap): void => {
    this.pairs = pairs
  })
}

export {
  PairStore,
}
