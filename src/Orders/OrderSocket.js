// @flow
import {AppSocket} from "../Sockets/socket"
import {Interval} from "../Interval/Interval"
import {Order, OrderDirectionType, OrderType} from "./Order"
import {OrderStatusType} from "./Order"
import {
  SOCKET_EVENT_CLEAR_ORDERS, SOCKET_EVENT_GET_ORDERS, SOCKET_EVENT_NEW_ORDERS, SOCKET_EVENT_SUBSCRIBE,
  SOCKET_EVENT_UNSUBSCRIBE,
  SUBSCRIBED_EVENT_NEW_ORDER
} from "../Sockets/SocketEvents"
import type {FlashMessageHandlerType} from "../FlashMessage/handling"
import {Balance} from "../Balance/Balance"
import type {RawBalance} from "../Balance/BalanceSocket"
import type {PortfolioSnapshot} from "../PortfolioSnapshot/PortfolioSnapshot"

type RawOrder = {
  order_id: string,
  strategy_run_id: string,
  market: string,
  pair: string,
  created_at: string,
  direction: OrderDirectionType,
  type: OrderType,
  quantity: string,
  rate: string,
  id_on_market: string,
  status: OrderStatusType,
  closed_at: ?string,
  canceled_at: ?string,
}

class OrdersSocket {
  socket: AppSocket
  flashMessageHandler: FlashMessageHandlerType

  constructor(socket: AppSocket, flashMessageHandler: FlashMessageHandlerType) {
    this.socket = socket
    this.flashMessageHandler = flashMessageHandler
  }

  registerNewOrderEvent(processOrders: (order: Array<Order>) => void) {
    this.socket.socketio.on(SOCKET_EVENT_NEW_ORDERS, (rawOrder: RawOrder) => {
      OrdersSocket.processRawOrders([rawOrder], processOrders)
    })
  }

  reloadOrders(
    market: string,
    pair: string,
    interval: Interval,
    orderStorage: string,
    strategyRunId: ?string,
    processOrders: (order: Array<Order>) => void
  ) {
    const getOrdersData = {
      pair: pair,
      market: market,
      interval: interval.toIso(),
      order_storage: orderStorage,
      strategy_run_id: strategyRunId,
    }

    this.socket.emit(SOCKET_EVENT_GET_ORDERS, getOrdersData, (status: string, rawOrders: Array<RawOrder>) => {
      OrdersSocket.processRawOrders(rawOrders, processOrders)
      this.subscribeToOrdersFeed(orderStorage, market, pair, interval)
    })
  }

  static processRawOrders(rawOrders: Array<RawOrder>, processOrders: (order: Array<Order>) => void) {
    console.log('Received ORDER', Object.values(rawOrders).length)
    let orders = OrdersSocket.parseOrdersDataIntoStateObject(rawOrders)

    // Sometimes there is an error in backend simulation that can create "empty" order.
    // We simply filter it out at it dow not affect the system.
    // See https://github.com/Achse/coinrat/issues/50 for more info.
    orders = orders.filter((order: Order) => {
      return order.getBaseCurrencyAmount() > 0.0000001 && order.getMarketCurrencyAmount() > 0.0000001
    })

    processOrders(orders)
  }

  subscribeToOrdersFeed(orderStorage: string, market: string, pair: string, interval: Interval) {
    this.socket.emit(
      SOCKET_EVENT_UNSUBSCRIBE,
      {event: SUBSCRIBED_EVENT_NEW_ORDER},
      () => {
        this.socket.emit(SOCKET_EVENT_SUBSCRIBE, {
          event: SUBSCRIBED_EVENT_NEW_ORDER,
          storage: orderStorage,
          market: market,
          pair: pair,
          interval: interval,
        })
      })
  }

  clearAllOrders(market: string, pair: string, interval: Interval, orderStorage: string) {
    console.log('Emitting event to CLEAR ALL ORDERS.')
    this.socket.emit(SOCKET_EVENT_CLEAR_ORDERS, {
      order_storage: orderStorage,
      market: market,
      pair: pair,
      interval: interval,
    }, () => {
      this.flashMessageHandler("Order storage in given range cleared.", 'pt-intent-success')
    })
  }

  static parseOrdersDataIntoStateObject(ordersRaw: Array<RawOrder>): Array<Order> {
    return ordersRaw.map((rawOrder: RawOrder) => OrdersSocket.parseOneOrderFromData(rawOrder))
  }

  static parseOneOrderFromData(rawOrder: RawOrder): Order {
    return new Order(
      rawOrder.order_id,
      rawOrder.strategy_run_id,
      rawOrder.market,
      rawOrder.direction,
      new Date(Date.parse(rawOrder.created_at)),
      rawOrder.pair,
      rawOrder.type,
      rawOrder.quantity,
      rawOrder.rate,
      rawOrder.id_on_market,
      rawOrder.status,
      rawOrder.closed_at !== null ? new Date(Date.parse(rawOrder.closed_at)) : null,
      rawOrder.canceled_at !== null ? new Date(Date.parse(rawOrder.canceled_at)) : null,
      this.parsePortfolioSnapshot(rawOrder)
    )
  }

  static parsePortfolioSnapshot(rawOrder: RawOrder): ?PortfolioSnapshot {
    const portfolioSnapshot = rawOrder['portfolio_snapshot'] !== undefined ? rawOrder['portfolio_snapshot'] : null
    if (portfolioSnapshot !== null) {
      const balances = {}
      portfolioSnapshot.balances.forEach(
        (rawBalance: RawBalance) => {
          balances[rawBalance.currency] = new Balance(rawBalance.currency, rawBalance.available_amount)
        }
      )
      portfolioSnapshot.balances = balances
    }
    return portfolioSnapshot
  }
}

export {
  OrdersSocket,
}
