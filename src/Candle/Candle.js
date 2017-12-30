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

export default Candle
