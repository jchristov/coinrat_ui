import React, {Component} from 'react'
import PropTypes from "prop-types"
import {scaleTime} from "d3-scale"
import {utcDay} from "d3-time"

import {ChartCanvas, Chart} from "react-stockcharts"
import {CandlestickSeries} from "react-stockcharts/lib/series"
import {XAxis, YAxis} from "react-stockcharts/lib/axes"
import {fitWidth} from "react-stockcharts/lib/helper"
import {last, timeIntervalBarWidth} from "react-stockcharts/lib/utils"
import {socket, EVENT_CANDLES} from '../socket'

class CandlestickChartComponent extends Component {
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
    const {type, width, data, ratio} = this.props
    const xAccessor = d => d.date
    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100])
    ]
    return (
      <ChartCanvas height={400}
                   ratio={ratio}
                   width={width}
                   margin={{left: 50, right: 50, top: 10, bottom: 30}}
                   type={type}
                   seriesName="MSFT"
                   data={data}
                   xAccessor={xAccessor}
                   xScale={scaleTime()}
                   xExtents={xExtents}>

        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis axisAt="left" orient="left" ticks={5}/>
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
        </Chart>
      </ChartCanvas>
    )
  }
}

CandlestickChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
}

CandlestickChartComponent.defaultProps = {
  type: "svg",
}
CandlestickChartComponent = fitWidth(CandlestickChartComponent)

export default CandlestickChartComponent
