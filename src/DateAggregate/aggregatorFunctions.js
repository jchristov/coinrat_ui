// @flow
type AggregatorFunction = (date: Date) => Date

const minuteAggregationFunction: AggregatorFunction = (date: Date): Date => {
  const clonedDate = new Date(date.getTime())
  clonedDate.setSeconds(0)
  clonedDate.setMilliseconds(0)
  return clonedDate
}

export type {
  AggregatorFunction,
}
export {
  minuteAggregationFunction,
}
