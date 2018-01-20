// @flow
class Candle {
  date: Date
  open: number
  high: number
  low: number
  close: number
  volume: number

  constructor(
    date: Date,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number
  ) {
    this.date = date
    this.open = open
    this.high = high
    this.low = low
    this.close = close
    this.volume = volume
  }
}

class CandleAggregate {
  date: Date
  open: ?number
  high: ?number
  low: ?number
  close: ?number
  volume: number

  constructor(date: Date) {
    this.date = date
    this.open = null
    this.high = null
    this.low = null
    this.close = null
    this.volume = 0
  }

  addCandle = (candle: Candle | CandleAggregate) => {
    this.open = this.open === null ? candle.open : this.open
    this.low = this.low === null ? candle.low : Math.min(this.low, candle.low)
    this.high = this.high === null ? candle.high : Math.max(this.high, candle.high)
    this.close = candle.close
    this.volume += candle.volume
  }
}

export {
  Candle,
  CandleAggregate
}
