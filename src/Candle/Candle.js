// @flow
class Candle {
  date: Date
  open: number
  high: number
  low: number
  close: number
  volume: number
  size: string
  market: string
  pair: string

  constructor(
    date: Date,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    size: string,
    market: string,
    pair: string
  ) {
    this.date = date
    this.open = open
    this.high = high
    this.low = low
    this.close = close
    this.volume = volume
    this.size = size
    this.market = market
    this.pair = pair
  }
}

export {
  Candle,
}
