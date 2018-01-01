class Candle {
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

class CandleAggregate extends Candle {
  constructor(date: Date) {
    super(date, 0, 0, 0, 0, 0)
  }

  addCandle = (candle: Candle) => {
    this.open = Math.max(this.open, candle.open)
    this.high = Math.max(this.high, candle.high)
    this.low = Math.max(this.low, candle.low)
    this.close = Math.max(this.close, candle.close)
    this.volume += candle.volume
  }
}

export {
  Candle,
  CandleAggregate
}
