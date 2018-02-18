// @flow
import {PairSocket} from "./PairSocket"
import {action, extendObservable} from "mobx"
import {PairHashMap} from "./PairSocket"
import type {SelectElement} from "../Form/Select/SelectComponent"

class PairStore {

  pairs: PairHashMap
  pairSocket: PairSocket

  constructor(pairSocket: PairSocket) {
    this.pairSocket = pairSocket
    extendObservable(this, {pairs: {}})
  }

  reloadData = action((marketName: string, marketPluginName: string, onSuccess: () => void): void => {
    this.pairSocket.loadPairs(marketName, marketPluginName, (pairs: PairHashMap) => {
      this.setPairs(pairs)
      onSuccess()
    })
  })

  setPairs = action((pairs: PairHashMap): void => {
    this.pairs = pairs
  })

  hasAnyPair = (): boolean => Object.values(this.pairs).length > 0

  getFirstPair = (): SelectElement => Object.values(this.pairs)[0]
}

export {
  PairStore,
}
