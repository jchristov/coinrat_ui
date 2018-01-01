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
  dateBucket: Date
  direction: OrderDirectionType
  countOpen: number = 0
  countClosed: number = 0
  countCanceled: number = 0

  constructor(dateBucket: Date, direction: OrderDirectionType) {
    this.dateBucket = dateBucket
    this.direction = direction
  }

  increment = (status: OrderStatusType) => {
    if (status === STATUS_OPEN) this.countOpen++
    if (status === STATUS_CLOSED) this.countClosed++
    if (status === STATUS_CANCELED) this.countCanceled++
  }
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
