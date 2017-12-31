// @flow
import React, {Component} from 'react'
import {ChartCanvas, Chart} from "react-stockcharts"
import {CandlestickSeries} from "react-stockcharts/lib/series"
import {XAxis, YAxis} from "react-stockcharts/lib/axes"
import {fitWidth} from "react-stockcharts/lib/helper"
import {scaleTime} from "d3-scale"
import Interval from "../Interval/Interval"
import Candle from "./Candle"

type Props = {
  data: Array<Candle>,
  width: number,
  ratio: number,
  type: 'svg' | 'hybrid',
  interval: Interval,
}

class CandlesChart extends Component<Props> {
  props: Props

  render() {
    const {type, width, data, ratio, interval} = this.props
    const xAccessor = (candle: Candle) => candle.date

    const height = 400

    const margin = {left: 50, right: 50, top: 10, bottom: 30}
    const gridHeight = height - margin.top - margin.bottom
    const gridWidth = width - margin.left - margin.right

    const yGrid = {
      innerTickSize: -1 * gridWidth,
      tickStrokeDasharray: 'Solid',
      tickStrokeOpacity: 0.2,
      tickStrokeWidth: 1
    }
    const xGrid = {
      innerTickSize: -1 * gridHeight,
      tickStrokeDasharray: 'Solid',
      tickStrokeOpacity: 0.2,
      tickStrokeWidth: 1
    }

    return (
      <ChartCanvas
        mouseMoveEvent={false}
        zoomEvent={false}
        panEvent={false}
        height={height}
        ratio={ratio}
        width={width}
        margin={margin}
        type={type}
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={[interval.since, interval.till]}
      >
        <Chart id={1} yExtents={(candle: Candle) => [candle.high, candle.low]}>
          <XAxis {...xGrid} axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis {...yGrid} axisAt="left" orient="left" ticks={5}/>
          <CandlestickSeries/>
        </Chart>
      </ChartCanvas>
    )
  }
}

CandlesChart = fitWidth(CandlesChart)

export default CandlesChart
