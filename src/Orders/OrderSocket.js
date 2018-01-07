// @flow
import {AppSocket, socket} from "../Sockets/socket"
import Interval from "../Interval/Interval"
import {Order, OrderDirectionType} from "./Order"
import appMainToaster from "../Toaster"
import {OrderStatusType} from "./Order"
import {
  SOCKET_EVENT_CLEAR_ORDERS, SOCKET_EVENT_GET_ORDERS, SOCKET_EVENT_NEW_ORDERS,
  SUBSCRIBED_EVENT_NEW_ORDER
} from "../Sockets/SocketEvents"

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

class OrdersSocket {

  constructor(socket: AppSocket) {
    this.socket = socket
  }

  registerNewOrderEvent(processOrders: (order: Array<Order>) => void) {
    this.socket.socketio.on(SOCKET_EVENT_NEW_ORDERS, (orderRaw) => {
      processOrders([OrdersSocket.parseOneOrderFromData(orderRaw)])
    })
  }

  reloadOrders(
    market: string,
    pair: string,
    interval: Interval,
    orderStorage: string,
    processOrders: (order: Array<Order>) => void
  ) {
    this.socket.emit(SOCKET_EVENT_GET_ORDERS, {
      pair: pair,
      market: market,
      interval: interval.toIso(),
      order_storage: orderStorage,
    }, (status: string, rawOrders: Array<RawOrder>) => {
      console.log('Received ORDER', Object.values(rawOrders).length, 'orders!')
      processOrders(OrdersSocket.parseOrdersDataIntoStateObject(rawOrders))
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

  static parseOrdersDataIntoStateObject(ordersRaw: Array<RawOrder>): Array<Order> {
    return ordersRaw.map((rawOrder: RawOrder) => OrdersSocket.parseOneOrderFromData(rawOrder))
  }

  static parseOneOrderFromData(order: RawOrder): Order {
    return new Order(
      new Date(Date.parse(order.created_at)),
      order.direction,
      order.status,
    )
  }
}

const orderSocketInstance: OrdersSocket = new OrdersSocket(socket)

export {
  OrdersSocket,
  orderSocketInstance
}
