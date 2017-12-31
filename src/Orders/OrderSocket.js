// @flow
import {
  socket,
  SOCKET_EVENT_GET_ORDERS, SOCKET_EVENT_NEW_ORDERS, SOCKET_EVENT_SUBSCRIBE, SOCKET_EVENT_UNSUBSCRIBE,
  SOCKET_EVENT_CLEAR_ORDERS,
  SUBSCRIBED_EVENT_NEW_ORDER
} from "../Sockets/socket"
import {Socket} from "socket.io-client"
import Interval from "../Interval/Interval"
import Order from "./Order"

type RawOrder = {
  created_at: string,
}

export default class OrdersSocket {

  constructor(socket: Socket) {
    this.socket = socket
  }

  registerNewOrderEvent(onNewOrder: (order: Order) => void) {
    this.socket.on(SOCKET_EVENT_NEW_ORDERS, (orderRaw) => {
      const order = OrdersSocket.parseOneOrderFromData(orderRaw)
      onNewOrder(order)
    })
  }

  reloadOrders(market: string, pair: string, interval: Interval, orderStorage: string, onNewOrders: (any) => void) {
    console.log('Reloading ORDER orders... ', pair, market, interval.since, interval.till)

    socket.emit(SOCKET_EVENT_GET_ORDERS, {
      pair: pair,
      market: market,
      interval: {
        since: interval.since !== null ? interval.since.toISOString() : null,
        till: interval.till !== null ? interval.till.toISOString() : null,
      },
      order_storage: orderStorage,
    }, (status, data) => {
      if (status !== 'OK') {
        console.log('Server returned ERROR: ', data['message'])
        return
      }

      const orders = OrdersSocket.parseOrdersDataIntoStateObject(data)
      onNewOrders(orders)
      console.log('Received ORDER', Object.values(orders).length, 'orders!')

      this.socket.emit(SOCKET_EVENT_UNSUBSCRIBE, {event: SUBSCRIBED_EVENT_NEW_ORDER}, () => {
        this.socket.emit(SOCKET_EVENT_SUBSCRIBE, {
          event: SUBSCRIBED_EVENT_NEW_ORDER,
          order_storage: orderStorage,
          market: market,
          pair: pair,
          interval: interval,
        })
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
    })
  }

  static parseOrdersDataIntoStateObject(ordersRaw: Array<RawOrder>): Array<Order> {
    const orders: Array<Order> = {}
    for (let i = 0; i < ordersRaw.length; i++) {
      const order = OrdersSocket.parseOneOrderFromData(ordersRaw[i])
      orders[order.createdAt.toISOString()] = order
    }
    return orders
  }

  static parseOneOrderFromData(order: RawOrder): Order {
    return new Order(new Date(Date.parse(order.created_at)))
  }
}
