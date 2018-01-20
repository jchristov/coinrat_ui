// @flow
import {DIRECTION_BUY, DIRECTION_SELL, OrderDirectionAggregate} from "../Orders/Order"
import {CandleAggregate} from "../Candle/Candle"
import {AggregatorFunction} from "../DateAggregate/aggregatorFunctions"


class ChartAggregate {
  date: Date
  buyOrderAggregate: OrderDirectionAggregate
  sellOrderAggregate: OrderDirectionAggregate
  candleAggregate: CandleAggregate

  constructor(date: Date) {
    this.date = date
    this.buyOrderAggregate = new OrderDirectionAggregate(date, DIRECTION_BUY)
    this.sellOrderAggregate = new OrderDirectionAggregate(date, DIRECTION_SELL)
    this.candleAggregate = new CandleAggregate(date)
  }
}

const createAggregateFromData = (
  candles: Array<CandleAggregate>,
  buyOrders: Array<OrderDirectionAggregate>,
  sellOrders: Array<OrderDirectionAggregate>,
  aggregatorFunction: AggregatorFunction
): Array<ChartAggregate> => {
  let data: { [key: string]: ChartAggregate } = {}

  if (candles.length === 0) {
    return []
  }

  for (let i = 0; i < candles.length; i++) {
    const candle = candles[i]
    const date = aggregatorFunction(candle.date)
    const key = calculateAggregateHash(date)
    if (data[key] === undefined) {
      data[key] = new ChartAggregate(date)
    }
    data[key].candleAggregate = candle
  }

  for (let i = 0; i < buyOrders.length; i++) {
    const order = buyOrders[i]
    const date = aggregatorFunction(order.dateBucket)
    const key = calculateAggregateHash(date)
    if (data[key] === undefined) {
      data[key] = new ChartAggregate(date)
    }
    data[key].buyOrderAggregate = order
  }

  for (let i = 0; i < sellOrders.length; i++) {
    const order = sellOrders[i]
    const date = aggregatorFunction(order.dateBucket)
    const key = calculateAggregateHash(date)
    if (data[key] === undefined) {
      data[key] = new ChartAggregate(date)
    }
    data[key].sellOrderAggregate = order
  }

  const sortBy = (first: ChartAggregate, second: ChartAggregate) => {
    if (first.date < second.date) return -1
    if (first.date > second.date) return 1
    return 0
  }

  return Object.values(data).sort(sortBy)
}

const calculateAggregateHash = (date: Date): string => {
  function str_pad(n) {
    return String('00' + n).slice(-2)
  }

  return `${date.getFullYear()}-${str_pad(date.getMonth() + 1)}-${str_pad(date.getDate())} `
    + `${str_pad(date.getHours())}:${str_pad(date.getMinutes())}:${str_pad(date.getSeconds())}`
}

export {
  ChartAggregate,
  createAggregateFromData,
  calculateAggregateHash,
}
