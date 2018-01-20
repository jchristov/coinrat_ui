// @flow
const DIRECTION_SELL = 'sell'
const DIRECTION_BUY = 'buy'

const STATUS_OPEN = 'open'
const STATUS_CLOSED = 'closed'
const STATUS_CANCELED = 'canceled'

const ORDER_TYPE_LIMIT = 'limit'
const ORDER_TYPE_MARKET = 'market'

type OrderDirectionType = DIRECTION_SELL | DIRECTION_BUY
type OrderType = ORDER_TYPE_LIMIT | ORDER_TYPE_MARKET
type OrderStatusType = STATUS_OPEN | STATUS_CLOSED | STATUS_CANCELED

class Order {
  orderId: string
  market: string
  direction: OrderDirectionType
  createdAt: Date
  pair: string
  type: OrderType
  quantity: string
  rate: string
  idOnMarket: string
  status: OrderStatusType
  closedAt: ?Date
  canceledAt: ?Date

  constructor(
    orderId: string,
    market: string,
    direction: OrderDirectionType,
    createdAt: Date,
    pair: string,
    type: OrderType,
    quantity: string,
    rate: string,
    idOnMarket: string,
    status: OrderStatusType,
    closedAt: Date,
    canceledAt: Date
  ) {
    this.orderId = orderId
    this.market = market
    this.direction = direction
    this.createdAt = createdAt
    this.pair = pair
    this.type = type
    this.quantity = quantity
    this.rate = rate
    this.idOnMarket = idOnMarket
    this.status = status
    this.closedAt = closedAt
    this.canceledAt = canceledAt
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
    if (status === STATUS_OPEN) {
      this.countOpen++

    } else if (status === STATUS_CLOSED) {
      this.countClosed++

    } else if (status === STATUS_CANCELED) {
      this.countCanceled++

    } else {
      console.error('ERROR: unsupported order status: ', status)
    }
  }

  addAggregate = (aggregate: OrderDirectionAggregate) => {
    this.countOpen += aggregate.countOpen
    this.countClosed += aggregate.countClosed
    this.countCanceled += aggregate.countCanceled
  }

}

export type {
  OrderType,
  OrderDirectionType,
  OrderStatusType,
}

export {
  Order,
  OrderDirectionAggregate,

  ORDER_TYPE_LIMIT,
  ORDER_TYPE_MARKET,

  DIRECTION_SELL,
  DIRECTION_BUY,

  STATUS_OPEN,
  STATUS_CLOSED,
  STATUS_CANCELED,
}
