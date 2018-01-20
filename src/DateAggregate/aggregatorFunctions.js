// @flow

type AggregatorFunction = (date: Date) => Date

const minuteAggregationFunction: AggregatorFunction = (date: Date): Date => {
  const clonedDate = new Date(date.getTime())
  clonedDate.setSeconds(0)
  return clonedDate
}

const hourAggregationFunction: AggregatorFunction = (date: Date): Date => {
  const clonedDate = new Date(date.getTime())
  clonedDate.setSeconds(0)
  clonedDate.setMinutes(0)
  return clonedDate
}

export type {
  AggregatorFunction,
}
export {
  minuteAggregationFunction,
  hourAggregationFunction,
}
