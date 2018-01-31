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
    const orders = OrdersSocket.parseOrdersDataIntoStateObject(rawOrders)
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
      rawOrder.canceled_at !== null ? new Date(Date.parse(rawOrder.canceled_at)) : null
    )
  }
}

export {
  OrdersSocket,
}
