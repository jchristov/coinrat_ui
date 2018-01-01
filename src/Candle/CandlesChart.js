// @flow
import React, {Component} from 'react'
import {ChartCanvas, Chart} from "react-stockcharts"
import {CandlestickSeries} from "react-stockcharts/lib/series"
import {XAxis, YAxis} from "react-stockcharts/lib/axes"
import {fitWidth} from "react-stockcharts/lib/helper"
import {scaleTime} from "d3-scale"
import Interval from "../Interval/Interval"
import Candle from "./Candle"
import {timeFormat} from "d3-time-format"
import {format} from "d3-format"
import MouseCoordinateY from "react-stockcharts/es/lib/coordinates/MouseCoordinateY"
import MouseCoordinateX from "react-stockcharts/es/lib/coordinates/MouseCoordinateX"
import CrossHairCursor from "react-stockcharts/es/lib/coordinates/CrossHairCursor"

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

    const canvasProps = {
      // mouseMoveEvent: false,
      zoomEvent: false,
      panEvent: false,
      height: height,
      ratio: ratio,
      width: width,
      margin: margin,
      type: type,
      seriesName: 'MSFT',
      xAccessor: (candle: Candle) => candle.date,
      xScale: scaleTime(),
      xExtents: [interval.since, interval.till],
    }

    return (
      <ChartCanvas {...canvasProps} data={data}>
        <Chart id={1} yExtents={(candle: Candle) => [candle.high, candle.low]}>
          <MouseCoordinateX
            at="bottom"
            orient="top"
            displayFormat={timeFormat("%Y-%m-%d %X")}
            rectWidth={160}
          />
          <MouseCoordinateY
            at="left"
            orient="right"
            displayFormat={format(".8")}
            rectWidth={100}
          />
          <XAxis {...xGrid} axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis {...yGrid} axisAt="left" orient="left" ticks={5}/>
          <CandlestickSeries/>
        </Chart>
        <CrossHairCursor/>
      </ChartCanvas>
    )
  }
}

CandlesChart = fitWidth(CandlesChart)

export default CandlesChart
