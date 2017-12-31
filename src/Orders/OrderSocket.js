// @flow
import {
  AppSocket,
  SOCKET_EVENT_GET_ORDERS,
  SOCKET_EVENT_NEW_ORDERS,
  SOCKET_EVENT_CLEAR_ORDERS,
  SUBSCRIBED_EVENT_NEW_ORDER,
} from "../Sockets/socket"
import Interval from "../Interval/Interval"
import {Order, OrderDirectionType} from "./Order"
import appMainToaster from "../Toaster"
import type {OrderStatusType} from "./Order"

type RawOrder = {
  order_id: string,
  market: string,
  pair: string,
  created_at: string,
  direction: OrderDirectionType,
  type: 'limit' | 'market',
  quantity: string,
  rate: string,
  id_on_market: string,
  status: OrderStatusType,
  canceled_at: string,
}

export default class OrdersSocket {

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  registerNewOrderEvent(onNewOrder: (order: Order) => void) {
    this.socket.socketio.on(SOCKET_EVENT_NEW_ORDERS, (orderRaw) => {
      const order = OrdersSocket.parseOneOrderFromData(orderRaw)
      onNewOrder(order)
    })
  }

  reloadOrders(
    market: string,
    pair: string,
    interval: Interval,
    orderStorage: string,
    onNewOrders: ({ [key: string]: Order }) => void
  ) {
    this.socket.emit(SOCKET_EVENT_GET_ORDERS, {
      pair: pair,
      market: market,
      interval: interval.toIso(),
      order_storage: orderStorage,
    }, (status, data) => {
      const orders = OrdersSocket.parseOrdersDataIntoStateObject(data)
      onNewOrders(orders)
      console.log('Received ORDER', Object.values(orders).length, 'orders!')
      this.socket.subscribeForUpdates(SUBSCRIBED_EVENT_NEW_ORDER, market, pair, interval, orderStorage)
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
      appMainToaster.show({message: "Order storage in given range cleared.", className: 'pt-intent-success'})
    })
  }

  static parseOrdersDataIntoStateObject(ordersRaw: Array<RawOrder>): { [key: string]: Order } {
    const orders: { [key: string]: Order } = {}
    for (let i = 0; i < ordersRaw.length; i++) {
      const order = OrdersSocket.parseOneOrderFromData(ordersRaw[i])
      orders[order.createdAt.toISOString()] = order
    }
    return orders
  }

  static parseOneOrderFromData(order: RawOrder): Order {
    return new Order(
      new Date(Date.parse(order.created_at)),
      order.direction,
      order.status,
    )
  }
}
