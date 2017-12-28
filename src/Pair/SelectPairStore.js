import {extendObservable} from "mobx"

class SelectPairStore {
  constructor() {
    extendObservable(this, {
      selectedPair: 'USD_BTC',
    })
  }

  changeSelectedPair(pair) {
    this.selectedPair = pair
  }
}

const selectPairStore = new SelectPairStore()

export default selectPairStore
