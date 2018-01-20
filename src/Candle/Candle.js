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
    if (this.open === null) {
      this.open = candle.open
    }

    if (this.low === null) {
      this.low = candle.low
    } else {
      this.low = Math.min(this.low, candle.low)
    }

    if (this.high === null) {
      this.high = candle.high
    } else {
      this.high = Math.max(this.high, candle.high)
    }

    this.close = candle.close
    this.volume += candle.volume
  }
}

export {
  Candle,
  CandleAggregate
}
