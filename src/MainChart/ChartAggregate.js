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

const createAggregateFromData = (
  candles: Array<Candle>,
  buyOrderAggregates: Array<OrderDirectionAggregate>,
  sellOrderAggregates: Array<OrderDirectionAggregate>
): Array<ChartAggregate> => {
  if (candles.length === 0) {
    return []
  }

  const sortBy = (first: ChartAggregate, second: ChartAggregate) => {
    if (first.date < second.date) return -1
    if (first.date > second.date) return 1
    return 0
  }

  let data: { [key: string]: ChartAggregate } = {}

  candles.sort(sortBy)
  buyOrderAggregates.sort(sortBy)
  sellOrderAggregates.sort(sortBy)

  for (let i = 0; i < candles.length; i++) {
    const candle = candles[i]
    const key = calculateAggregateHash(candle.date)
    data[key] = new ChartAggregate(candle)

    let lastBuyOrder = buyOrderAggregates[0]
    while (lastBuyOrder !== undefined && lastBuyOrder.dateBucket >= candle.date && (i + 1 === candles.length || lastBuyOrder.dateBucket < candles[i + 1].date)) {
      data[key].buyOrderAggregate.addAggregate(lastBuyOrder)
      buyOrderAggregates.shift()
      lastBuyOrder = buyOrderAggregates[0]
    }

    let lastSellOrder = sellOrderAggregates[0]
    while (lastSellOrder !== undefined && lastSellOrder.dateBucket >= candle.date && (i + 1 === candles.length || lastSellOrder.dateBucket < candles[i + 1].date)) {
      data[key].sellOrderAggregate.addAggregate(lastSellOrder)
      sellOrderAggregates.shift()
      lastSellOrder = sellOrderAggregates[0]
    }
  }

  return Object.values(data)
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
