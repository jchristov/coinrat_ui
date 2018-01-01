import {DIRECTION_BUY, DIRECTION_SELL, OrderDirectionAggregate} from "../Orders/Order"
import {CandleAggregate} from "../Candle/Candle"

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

export {
 ChartAggregate,
}
