// @flow
import {DIRECTION_BUY, DIRECTION_SELL, OrderDirectionAggregate} from "../Orders/Order"
import {Candle} from "../Candle/Candle"


class ChartAggregate {
  buyOrderAggregate: OrderDirectionAggregate
  sellOrderAggregate: OrderDirectionAggregate
  candle: Candle

  constructor(candle: Candle) {
    this.buyOrderAggregate = new OrderDirectionAggregate(candle.date, DIRECTION_BUY)
    this.sellOrderAggregate = new OrderDirectionAggregate(candle.date, DIRECTION_SELL)
    this.candle = candle
  }

  get date() {
    return this.candle.date
  }
}

const sortCandleByDate = (first: Candle, second: Candle) => {
  if (first.date < second.date) return -1
  if (first.date > second.date) return 1
  return 0
}

const sortOrderAggregatesByDate = (first: OrderDirectionAggregate, second: OrderDirectionAggregate) => {
  if (first.dateBucket < second.dateBucket) return 1
  if (first.dateBucket > second.dateBucket) return -1
  return 0
}

type AggregationResult = {
  data: Array<ChartAggregate>,
  maxOrderTickSize: number,
}

type ChartRow = { // This format is required by 'react-stockcharts' library
  date: Date,
  open: number,
  high: number,
  low: number,
  close: number,
  aggregate: ChartAggregate,
}

const createAggregateFromData = (
  candles: Array<Candle>,
  buyOrderAggregates: Array<OrderDirectionAggregate>,
  sellOrderAggregates: Array<OrderDirectionAggregate>
): AggregationResult => {
  if (candles.length === 0) {
    return {data: [], maxOrderTickSize: null}
  }
  let data: { [key: string]: ChartRow } = {}
  let maxOrderTickSize = 0

  candles.sort(sortCandleByDate)
  buyOrderAggregates.sort(sortOrderAggregatesByDate)
  sellOrderAggregates.sort(sortOrderAggregatesByDate)

  const updateMaxValue = (aggregate: ChartAggregate) => {
    const maxValue = Math.max(aggregate.buyOrderAggregate.maxValue(), aggregate.sellOrderAggregate.maxValue())
    if (maxOrderTickSize < maxValue) {
      maxOrderTickSize = maxValue
    }
  }

  for (let i = 0; i < candles.length; i++) {
    const candle = candles[i]
    const key = calculateAggregateHash(candle.date)
    data[key] = {
      date: candle.date,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      aggregate: new ChartAggregate(candle),
    }

    const isOrderInCandleBucket = (order: OrderDirectionAggregate): boolean => {
      return order.dateBucket >= candle.date && (i + 1 === candles.length || order.dateBucket < candles[i + 1].date)
    }

    let lastBuyOrder = buyOrderAggregates[buyOrderAggregates.length - 1]
    while (lastBuyOrder !== undefined && isOrderInCandleBucket(lastBuyOrder)) {
      data[key].aggregate.buyOrderAggregate.addAggregate(lastBuyOrder)
      updateMaxValue(data[key].aggregate)
      buyOrderAggregates.pop()
      lastBuyOrder = buyOrderAggregates[buyOrderAggregates.length - 1]
    }

    let lastSellOrder = sellOrderAggregates[sellOrderAggregates.length - 1]
    while (lastSellOrder !== undefined && isOrderInCandleBucket(lastSellOrder)) {
      data[key].aggregate.sellOrderAggregate.addAggregate(lastSellOrder)
      updateMaxValue(data[key].aggregate)
      sellOrderAggregates.pop()
      lastSellOrder = sellOrderAggregates[sellOrderAggregates.length - 1]
    }
  }

  return {
    data: Object.values(data),
    maxOrderTickSize: maxOrderTickSize,
  }
}

const calculateAggregateHash = (date: Date): string => {
  const str_pad = (n) => String('00' + n).slice(-2)

  return `${date.getFullYear()}-${str_pad(date.getMonth() + 1)}-${str_pad(date.getDate())} `
    + `${str_pad(date.getHours())}:${str_pad(date.getMinutes())}:${str_pad(date.getSeconds())}`
}

export type {
  AggregationResult,
  ChartRow,
}

export {
  ChartAggregate,
  createAggregateFromData,
  calculateAggregateHash,
}
