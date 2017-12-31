const DIRECTION_SELL = 'sell'
const DIRECTION_BUY = 'buy'

type OrderDirectionType = DIRECTION_SELL | DIRECTION_BUY

class Order {
  constructor(createdAt: Date, direction: OrderDirectionType) {
    this.createdAt = createdAt
    this.direction = direction
  }
}

export {
  Order,
  OrderDirectionType,
  DIRECTION_SELL,
  DIRECTION_BUY,
}
