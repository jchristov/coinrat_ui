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

    const lastBuyOrder = buyOrderAggregates[buyOrderAggregates.length - 1]
    if (lastBuyOrder !== undefined && lastBuyOrder.date <= candle.date) {
      data[key].buyOrderAggregate.addAggregate(lastBuyOrder)
      buyOrderAggregates.pop()
    }

    const lastSellOrder = sellOrderAggregates[sellOrderAggregates.length - 1]
    if (lastSellOrder !== undefined && lastSellOrder.date <= candle.date) {
      data[key].buyOrderAggregate.addAggregate(lastSellOrder)
      sellOrderAggregates.pop()
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
