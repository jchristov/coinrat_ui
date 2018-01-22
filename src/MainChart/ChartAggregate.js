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
  if (first.dateBucket < second.dateBucket) return -1
  if (first.dateBucket > second.dateBucket) return 1
  return 0
}

const createAggregateFromData = (
  candles: Array<Candle>,
  buyOrderAggregates: Array<OrderDirectionAggregate>,
  sellOrderAggregates: Array<OrderDirectionAggregate>
): Array<ChartAggregate> => {
  if (candles.length === 0) {
    return []
  }
  let data: { [key: string]: ChartAggregate } = {}

  candles.sort(sortCandleByDate)
  buyOrderAggregates.sort(sortOrderAggregatesByDate)
  sellOrderAggregates.sort(sortOrderAggregatesByDate)

  for (let i = 0; i < candles.length; i++) {
    const candle = candles[i]
    const key = calculateAggregateHash(candle.date)
    data[key] = new ChartAggregate(candle)

    const isOrderInCandleBucket = (order: OrderDirectionAggregate): boolean => {
      return order.dateBucket >= candle.date && (i + 1 === candles.length || order.dateBucket < candles[i + 1].date)
    }

    let lastBuyOrder = buyOrderAggregates[0]
    while (lastBuyOrder !== undefined && isOrderInCandleBucket(lastBuyOrder)) {
      data[key].buyOrderAggregate.addAggregate(lastBuyOrder)
      buyOrderAggregates.shift()
      lastBuyOrder = buyOrderAggregates[0]
    }

    let lastSellOrder = sellOrderAggregates[0]
    while (lastSellOrder !== undefined && isOrderInCandleBucket(lastSellOrder)) {
      data[key].sellOrderAggregate.addAggregate(lastSellOrder)
      sellOrderAggregates.shift()
      lastSellOrder = sellOrderAggregates[0]
    }
  }

  return Object.values(data)
}

const calculateAggregateHash = (date: Date): string => {
  const str_pad = (n) => String('00' + n).slice(-2)

  return `${date.getFullYear()}-${str_pad(date.getMonth() + 1)}-${str_pad(date.getDate())} `
    + `${str_pad(date.getHours())}:${str_pad(date.getMinutes())}:${str_pad(date.getSeconds())}`
}

export {
  ChartAggregate,
  createAggregateFromData,
  calculateAggregateHash,
}
