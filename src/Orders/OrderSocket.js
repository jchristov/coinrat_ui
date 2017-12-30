import {
  socket,
  SOCKET_EVENT_GET_ORDERS, SOCKET_EVENT_NEW_ORDERS, SOCKET_EVENT_SUBSCRIBE, SOCKET_EVENT_UNSUBSCRIBE,
  SOCKET_EVENT_CLEAR_ORDERS,
  SUBSCRIBED_EVENT_NEW_ORDER
} from "../Sockets/socket"

export default class OrdersSocket {

  constructor(socket) {
    this.socket = socket
  }

  registerNewOrderEvent(onNewOrder) {
    this.socket.on(SOCKET_EVENT_NEW_ORDERS, (orderRaw) => {
      const order = OrdersSocket.parseOneOrderFromData(orderRaw)
      onNewOrder(order)
    })
  }

  reloadOrders(market, pair, interval, orderStorage, onNewOrders) {
    console.log('Reloading ORDER orders... ', pair, market, interval.since, interval.till)

    socket.emit(SOCKET_EVENT_GET_ORDERS, {
      pair: pair,
      market_name: market,
      interval: {
        since: interval.since !== null ? interval.since.toISOString() : null,
        till: interval.till !== null ? interval.till.toISOString() : null,
      },
      orders_storage: orderStorage
    }, (status, data) => {
      if (status !== 'OK') {
        console.log('Server returned ERROR: ', data['message'])
        return
      }

      const orders = OrdersSocket.parseOrdersDataIntoStateObject(data)
      onNewOrders(orders)
      console.log('Received ORDER', Object.values(orders).length, 'orders!')

      socket.emit(SOCKET_EVENT_UNSUBSCRIBE, {event: SUBSCRIBED_EVENT_NEW_ORDER}, () => {
        socket.emit(SOCKET_EVENT_SUBSCRIBE, {
          event: SUBSCRIBED_EVENT_NEW_ORDER,
          order_storage: orderStorage,
          market: market,
          pair: pair,
          interval: interval,
        })
      })
    })
  }

  clearAllOrders(market, pair, interval, orderStorage) {
    socket.emit(SOCKET_EVENT_CLEAR_ORDERS, {
      event: SUBSCRIBED_EVENT_NEW_ORDER,
      order_storage: orderStorage,
      market: market,
      pair: pair,
      interval: interval,
    })
  }

  static parseOrdersDataIntoStateObject(ordersRaw) {
    const data = {}
    for (let i = 0; i < ordersRaw.length; i++) {
      const orderRaw = ordersRaw[i]
      const order = OrdersSocket.parseOneOrderFromData(orderRaw)
      data[order.date.toISOString()] = order
    }
    return data
  }

  static parseOneOrderFromData(order) {
    return {
      date: new Date(Date.parse(order.created_at)),
      volume: 1,
    }
  }
}
