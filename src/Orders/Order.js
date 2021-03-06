// @flow
import {extendObservable} from "mobx"
import type {PortfolioSnapshot} from "../PortfolioSnapshot/PortfolioSnapshot"

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
  strategyRunId: string
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
  portfolioSnapshot: ?PortfolioSnapshot

  constructor(
    orderId: string,
    strategyRunId: string,
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
    canceledAt: Date,
    portfolioSnapshot: ?PortfolioSnapshot
  ) {
    this.orderId = orderId
    this.strategyRunId = strategyRunId
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
    this.portfolioSnapshot = portfolioSnapshot
  }

  getBaseCurrencyAmount(): Number {
    return Number(this.quantity) * Number(this.rate)
  }

  getMarketCurrencyAmount(): string {
    return this.quantity
  }

  isBuy(): boolean {
    return this.direction === DIRECTION_BUY
  }

  isSell(): boolean {
    return this.direction === DIRECTION_SELL
  }

  transactionBaseCurrencyValue(): Number {
    return (this.isBuy() ? -1 : 1) * this.getBaseCurrencyAmount()
  }

  transactionMarketCurrencyValue(): Number {
    return (this.isBuy() ? 1 : -1) * this.quantity
  }

  getBaseCurrencyName(): string {
    return this.pair.split('_')[0]
  }

  getMarketCurrencyName(): string {
    return this.pair.split('_')[1]
  }

  getTotalAfterOrderInBaseCurrency(): Number {
    const baseCurrencyBeforeOrder = this.portfolioSnapshot.balances[this.getBaseCurrencyName()].availableAmount
    const marketCurrencyBeforeOrder = this.portfolioSnapshot.balances[this.getMarketCurrencyName()].availableAmount

    return Math.abs(
      (baseCurrencyBeforeOrder - this.getBaseCurrencyAmount())
      + (marketCurrencyBeforeOrder - this.getMarketCurrencyAmount()) * this.rate
    )
  }
}

class OrderDirectionAggregate {
  dateBucket: Date
  direction: OrderDirectionType
  countOpen: number
  countClosed: number
  countCanceled: number

  constructor(dateBucket: Date, direction: OrderDirectionType) {
    this.dateBucket = dateBucket
    this.direction = direction

    extendObservable(this, {
      countOpen: 0,
      countClosed: 0,
      countCanceled: 0,
    })
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

  maxValue = () => Math.max(this.countOpen, this.countClosed, this.countCanceled)
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
