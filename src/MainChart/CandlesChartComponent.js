// @flow
import React, {Component} from 'react'

import {scaleTime} from "d3-scale"
import {timeFormat} from "d3-time-format"
import {format} from "d3-format"

import {ChartCanvas, Chart} from "react-stockcharts"
import {CandlestickSeries} from "react-stockcharts/lib/series"
import {XAxis, YAxis} from "react-stockcharts/lib/axes"
import {fitWidth} from "react-stockcharts/lib/helper"
import {StackedBarSeries} from "react-stockcharts/lib/series"
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates"

import Interval from "../Interval/Interval"
import {OrderDirectionAggregate, STATUS_CANCELED, STATUS_CLOSED, STATUS_OPEN} from "../Orders/Order"
import {ORDERS_STATUS_COLORS} from "../Orders/ChartColors"
import {AggregationResult, ChartAggregate} from "./ChartAggregate"

type Props = {
  result: AggregationResult,
  width: number,
  ratio: number,
  type: 'svg' | 'hybrid',
  interval: Interval,
}

const BETWEEN_SPACE = 30
const margin = {left: 50, right: 50, top: 10, bottom: 30}
const candleChartHeight = 400
const buyOrderChartHeight = 80
const sellOrderChartHeight = 80
const wholeChartHeight =
  margin.top
  + candleChartHeight
  + BETWEEN_SPACE + buyOrderChartHeight
  + BETWEEN_SPACE + sellOrderChartHeight
  + margin.bottom

class CandlesChartComponent extends Component<Props> {
  props: Props

  getColorForOrder = (chartAggregate: ChartAggregate, i: number): string => {
    const status_map = [
      ORDERS_STATUS_COLORS[STATUS_OPEN],
      ORDERS_STATUS_COLORS[STATUS_CLOSED],
      ORDERS_STATUS_COLORS[STATUS_CANCELED],
    ]

    return status_map[i]
  }

  render() {
    const {type, width, result, ratio, interval} = this.props
    const {yGrid, xGrid} = this.calculateGrid(width, candleChartHeight)

    const canvasProps = {
      zoomEvent: false,
      panEvent: false,
      height: wholeChartHeight,
      ratio: ratio,
      width: width,
      margin: margin,
      type: type,
      seriesName: 'main-chart',
      xAccessor: (chartAggregate: ChartAggregate) => chartAggregate.date,
      xScale: scaleTime(),
      xExtents: [interval.since, interval.till],
    }

    const yCandlesExtends = (chartAggregate: ChartAggregate) => [
      chartAggregate.candle.high,
      chartAggregate.candle.low,
    ]

    const yCandleAccessor = (chartAggregate: ChartAggregate) => {
      return {
        open: chartAggregate.candle.open,
        high: chartAggregate.candle.high,
        low: chartAggregate.candle.low,
        close: chartAggregate.candle.close,
      }
    }

    return (
      <ChartCanvas {...canvasProps} data={result.data}>
        <Chart id={1} yExtents={yCandlesExtends} height={400}>
          <MouseCoordinateX at="bottom" orient="top" displayFormat={timeFormat("%Y-%m-%d %X")} rectWidth={160}/>
          <MouseCoordinateY at="left" orient="right" displayFormat={format(".8")} rectWidth={100}/>
          <XAxis {...xGrid} axisAt="bottom" orient="bottom"/>
          <YAxis {...yGrid} axisAt="left" orient="left"/>
          <CandlestickSeries yAccessor={yCandleAccessor}/>
        </Chart>
        {this.renderOrderChart(
          2,
          width,
          buyOrderChartHeight,
          sellOrderChartHeight + 30,
          (chartAggregate: ChartAggregate): OrderDirectionAggregate => chartAggregate.buyOrderAggregate,
          result.maxOrderTickSize
        )}
        {this.renderOrderChart(
          3,
          width,
          sellOrderChartHeight,
          0,
          (chartAggregate: ChartAggregate): OrderDirectionAggregate => chartAggregate.sellOrderAggregate,
          result.maxOrderTickSize
        )}
        <CrossHairCursor/>
      </ChartCanvas>
    )
  }

  calculateGrid(width: number, height: number) {
    const yGrid = {
      innerTickSize: -1 * (width - margin.left - margin.right),
      tickStrokeDasharray: 'Solid',
      tickStrokeOpacity: 0.2,
      tickStrokeWidth: 1
    }
    const xGrid = {
      innerTickSize: -1 * height,
      tickStrokeDasharray: 'Solid',
      tickStrokeOpacity: 0.2,
      tickStrokeWidth: 1
    }
    return {yGrid, xGrid}
  }

  renderOrderChart(
    id: number,
    width: number,
    height: number,
    highOffset: number,
    ordersResolver: (chartAggregate: ChartAggregate) => OrderDirectionAggregate,
    maxOrderTickSize: number
  ) {
    const orderChartProps = {
      height: height,
      origin: (w: number, h: number) => [0, h - height - highOffset],
      yExtents: (chartAggregate: ChartAggregate) => {
        const order = ordersResolver(chartAggregate)
        return [0, Math.max(order.countOpen, order.countClosed, order.countCanceled)]
      },
    }

    const {yGrid, xGrid} = this.calculateGrid(width, height)

    const orderBarProps = {
      fill: this.getColorForOrder,
      width: 4,
      yAccessor: [
        (chartAggregate: ChartAggregate) => ordersResolver(chartAggregate).countOpen,
        (chartAggregate: ChartAggregate) => ordersResolver(chartAggregate).countClosed,
        (chartAggregate: ChartAggregate) => ordersResolver(chartAggregate).countCanceled,
      ]
    }

    return <Chart id={id} {...orderChartProps} >
      <XAxis {...xGrid} axisAt="bottom" orient="bottom"/>
      <YAxis {...yGrid} axisAt="left" orient="left" ticks={maxOrderTickSize} tickFormat={format(',d')}/>
      <StackedBarSeries {...orderBarProps} />
    </Chart>
  }

}

CandlesChartComponent = fitWidth(CandlesChartComponent)

export default CandlesChartComponent
