// @flow
import {DIRECTION_BUY, DIRECTION_SELL, OrderDirectionAggregate} from "../Orders/Order"
import {CandleAggregate} from "../Candle/Candle"
import {aggregateDateSecond, calculateAggregateHash} from "../DateAggregate/aggregateHash"

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
  sellOrders: Array<OrderDirectionAggregate>
): Array<ChartAggregate> => {
  let data: { [key: string]: ChartAggregate } = {}

  for (let i = 0; i < candles.length; i++) {
    const candle = candles[i]
    const date = aggregateDateSecond(candle.date)
    const key = calculateAggregateHash(date)
    if (data[key] === undefined) {
      data[key] = new ChartAggregate(date)
    }
    data[key].candleAggregate = candle
  }

  for (let i = 0; i < buyOrders.length; i++) {
    const order = buyOrders[i]
    const date = aggregateDateSecond(order.dateBucket)
    const key = calculateAggregateHash(date)
    if (data[key] === undefined) {
      data[key] = new ChartAggregate(date)
    }
    data[key].buyOrderAggregate = order
  }

  for (let i = 0; i < sellOrders.length; i++) {
    const order = sellOrders[i]
    const date = aggregateDateSecond(order.dateBucket)
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

export {
  ChartAggregate,
  createAggregateFromData
}
