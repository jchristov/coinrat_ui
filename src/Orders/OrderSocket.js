// @flow
import {AppSocket, socket} from "../Sockets/socket"
import Interval from "../Interval/Interval"
import {Order, OrderDirectionType, OrderType} from "./Order"
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
  type: OrderType,
  quantity: string,
  rate: string,
  id_on_market: string,
  status: OrderStatusType,
  closed_at: ?string,
  canceled_at: ?string,
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
      console.log('Received ORDER', Object.values(rawOrders).length)
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

  static parseOneOrderFromData(rawOrder: RawOrder): Order {
    return new Order(
      rawOrder.order_id,
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

const orderSocketInstance: OrdersSocket = new OrdersSocket(socket)

export {
  OrdersSocket,
  orderSocketInstance
}
