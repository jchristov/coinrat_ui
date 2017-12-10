import React, {Component} from 'react'
import {socket, EVENT_CANDLES} from '../socket'
import CandlestickChartComponent from "./CandlestickChartComponent"
import {Spinner} from "@blueprintjs/core/dist/components/spinner/spinner"

class DashboardComponent extends Component {
  constructor() {
    super()
    this.updateData.bind(this)
    this.state = null
  }

  componentWillMount() {
    // Todo: make selectable
    socket.emit(EVENT_CANDLES, {
      pair: 'USD_BTC',
      market_name: 'bittrex',
      interval: {since: null, till: null}
    }, (status, data) => {
      console.log(status, data)

      this.updateData(data.map((candle) => {
        return {
          date: Date.parse(candle.time),
          open: +candle.open,
          high: +candle.high,
          low: +candle.low,
          close: +candle.close,
          volume: 0,
        }
      }))

    })
  }

  updateData(data) {
    this.setState({data: data})
  }

  render() {
    if (this.state === null) {
      return <Spinner/>
    }

    return <CandlestickChartComponent width="400" data={this.state.data} type="svg"/>
  }
}

export default DashboardComponent
