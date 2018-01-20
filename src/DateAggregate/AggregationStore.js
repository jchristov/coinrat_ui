// @flow

const UNIT_MINUTE = 'minute'
const UNIT_HOUR = 'hour'
const UNIT_DAY = 'day'
const UNIT_WEEK = 'week'

type AGGREGATION_UNIT = UNIT_MINUTE | UNIT_HOUR | UNIT_DAY | UNIT_WEEK

class AggregationStore {
 unit: AGGREGATION_UNIT
 aggregationSize: number

 constructor(unit: AGGREGATION_UNIT, aggregationSize: number) {
  extendObservable(this, {
   unit: unit,
   aggregationSize: aggregationSize,
  })
 }
}

const aggregationStoreInstance: AggregationStore = new AggregationStore(UNIT_MINUTE, 15)

export type {
 AGGREGATION_UNIT,
}
export {
 UNIT_MINUTE,
 UNIT_HOUR,
 UNIT_DAY,
 UNIT_WEEK,

 AggregationStore,
 aggregationStoreInstance,
}
