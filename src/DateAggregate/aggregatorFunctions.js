// @flow
import type {AGGREGATION_UNIT} from "./AggregationStore"
import {UNIT_DAY, UNIT_HOUR, UNIT_MINUTE} from "./AggregationStore"

type AggregatorFunction = (date: Date) => Date

const minuteAggregationFunction: AggregatorFunction = (date: Date): Date => {
  const clonedDate = new Date(date.getTime())
  clonedDate.setSeconds(0)
  return clonedDate
}

const UNIT_RANGES = {}
UNIT_RANGES[UNIT_MINUTE] = 60
UNIT_RANGES[UNIT_HOUR] = 24
UNIT_RANGES[UNIT_DAY] = 31

function getDateValueByUnit(date: Date, unit: AGGREGATION_UNIT) {
  if (unit === UNIT_MINUTE) {
    return date.getMinutes()

  } else if (unit === UNIT_HOUR) {
    return date.getHours()

  } else if (unit === UNIT_DAY) {
    return date.getDate()
  }

  throw Error(`Unsupported aggregation unit: ${unit}`)
}

function setValueByUnit(date: Date, unit: AGGREGATION_UNIT, value: number) {
  if (unit === UNIT_MINUTE) {
    date.setMinutes(value)

  } else if (unit === UNIT_HOUR) {
    date.setMinutes(0)
    date.setHours(value)

  } else if (unit === UNIT_DAY) {
    date.setMinutes(0)
    date.setHours(0)
    date.setDate(value)

  } else {
    throw Error(`Unsupported aggregation unit: ${unit}`)
  }
}

const createAggregationFunction = (unit: AGGREGATION_UNIT, size: number): AggregatorFunction => {
  return (date: Date): Date => {
    const clonedDate = new Date(date.getTime())
    clonedDate.setSeconds(0)

    const unitRange = UNIT_RANGES[unit]
    if (unitRange === undefined) {
      throw Error(`Unsupported aggregation unit: ${unit}`)
    }

    const currentValue = getDateValueByUnit(date, unit)
    const numberOfBuckets = unitRange / size
    const bucketNumber = Math.floor(currentValue / size)

    if (bucketNumber > numberOfBuckets) {
      throw Error(
        `Bucket ${bucketNumber} is higher than max number of buckets (${numberOfBuckets}), `
        + `currentValue: ${currentValue} unitRange: ${unitRange} size: ${size}, `
      )
    }

    setValueByUnit(clonedDate, unit, bucketNumber * size)

    return clonedDate
  }
}

export type {
  AggregatorFunction,
}
export {
  createAggregationFunction,
  minuteAggregationFunction,
}
