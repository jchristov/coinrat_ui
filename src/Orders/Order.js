const DIRECTION_SELL = 'sell'
const DIRECTION_BUY = 'buy'

const STATUS_OPEN = 'open'
const STATUS_CLOSED = 'closed'
const STATUS_CANCELED = 'canceled'

type OrderDirectionType = DIRECTION_SELL | DIRECTION_BUY

type OrderStatusType = STATUS_OPEN | STATUS_CLOSED | STATUS_CANCELED

class Order {
  createdAt: Date
  direction: OrderDirectionType
  status: OrderStatusType

  constructor(createdAt: Date, direction: OrderDirectionType, status: OrderStatusType) {
    this.createdAt = createdAt
    this.direction = direction
    this.status = status
  }
}

class OrderDirectionAggregate {
  direction: OrderDirectionType
  count: number = 0

  constructor(direction: OrderDirectionType) {
    this.direction = direction
  }

  increment = () => this.count++
}

export {
  Order,
  OrderDirectionAggregate,

  OrderDirectionType,
  DIRECTION_SELL,
  DIRECTION_BUY,

  OrderStatusType,
  STATUS_OPEN,
  STATUS_CLOSED,
  STATUS_CANCELED,
}
