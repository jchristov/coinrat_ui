// @flow
import {action, extendObservable} from "mobx"

const UNIT_MINUTE = 'minute'
const UNIT_HOUR = 'hour'
const UNIT_DAY = 'day'

type AGGREGATION_UNIT = UNIT_MINUTE | UNIT_HOUR | UNIT_DAY

class CandleSizeStore {
  unit: AGGREGATION_UNIT
  size: number
  candleSize: string

  constructor(unit: AGGREGATION_UNIT, size: number) {
    extendObservable(this, {
      unit: unit,
      size: size,
      candleSize: `${unit}-${size}`
    })
    this._concatCandleSize()
  }

  setCandleSize = action((unit: AGGREGATION_UNIT, aggregationSize: number) => {
    this.unit = unit
    this.size = aggregationSize
    this._concatCandleSize()
  })

  _concatCandleSize = () => {
    this.candleSize = `${this.size}-${this.unit}`
  }

}

const candleSizeStoreInstance: CandleSizeStore = new CandleSizeStore(UNIT_MINUTE, 15)

export type {
  AGGREGATION_UNIT,
}
export {
  UNIT_MINUTE,
  UNIT_HOUR,
  UNIT_DAY,

  CandleSizeStore,
  candleSizeStoreInstance,
}
