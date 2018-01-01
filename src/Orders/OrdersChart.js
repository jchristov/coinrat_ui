// @flow
import React, {Component} from 'react'
import {ChartCanvas, Chart} from "react-stockcharts"
import {StackedBarSeries} from "react-stockcharts/lib/series"
import {XAxis, YAxis} from "react-stockcharts/lib/axes"
import {fitWidth} from "react-stockcharts/lib/helper"
import {scaleTime} from "d3-scale"
import Interval from "../Interval/Interval"
import {OrderDirectionAggregate, STATUS_CANCELED, STATUS_CLOSED, STATUS_OPEN} from "./Order"
import {ORDERS_STATUS_COLORS} from "./ChartColors"

type Props = {
  buyOrders: Array<OrderDirectionAggregate>,
  sellOrders: Array<OrderDirectionAggregate>,
  width: number,
  ratio: number,
  type: 'svg' | 'hybrid',
  interval: Interval,
}

class OrdersChart extends Component<Props> {
  props: Props

  getColorForOrder = (order: OrderDirectionAggregate, i: number): string => {
    const status_map = [
      ORDERS_STATUS_COLORS[STATUS_OPEN],
      ORDERS_STATUS_COLORS[STATUS_CLOSED],
      ORDERS_STATUS_COLORS[STATUS_CANCELED],
    ]

    return status_map[i]
  }

  render() {
    const {type, buyOrders, sellOrders, width, ratio, interval} = this.props
    const height = 100
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
      mouseMoveEvent: false,
      zoomEvent: false,
      panEvent: false,
      height: height,
      ratio: ratio,
      width: width,
      margin: margin,
      type: type,
      seriesName: 'MSFT',
      xAccessor: (orderAggregate: OrderDirectionAggregate) => orderAggregate.dateBucket,
      xScale: scaleTime(),
      xExtents: [interval.since, interval.till],
    }

    const chartProps = {
      yExtents: (orderAggregate: OrderDirectionAggregate) => [
        0,
        Math.max(orderAggregate.countOpen, orderAggregate.countClosed, orderAggregate.countCanceled),
      ],
    }

    const barProps = {
      fill: this.getColorForOrder,
      width: 4,
      yAccessor: [
        (orderAggregate: OrderDirectionAggregate) => orderAggregate.countOpen,
        (orderAggregate: OrderDirectionAggregate) => orderAggregate.countClosed,
        (orderAggregate: OrderDirectionAggregate) => orderAggregate.countCanceled,
      ]
    }

    let buyChart = null
    if (buyOrders.length > 1) {
      buyChart = <div>
        <h3>Buy Orders</h3>
        <ChartCanvas {...canvasProps} data={buyOrders}>
          <Chart id={1} {...chartProps}>
            <XAxis {...yGrid} axisAt="bottom" orient="bottom" ticks={6}/>
            <YAxis {...yGrid} axisAt="left" orient="left" ticks={1}/>
            <StackedBarSeries {...barProps} />
          </Chart>
        </ChartCanvas>
      </div>
    }

    let sellChart = null
    if (sellOrders.length > 1) {
      sellChart = <div>
        <h3>Sell Orders</h3>
        <ChartCanvas {...canvasProps} data={sellOrders}>
          <Chart id={1} {...chartProps}>
            <XAxis {...xGrid} axisAt="bottom" orient="bottom" ticks={6}/>
            <YAxis {...yGrid} axisAt="left" orient="left" ticks={1}/>
            <StackedBarSeries {...barProps} /></Chart>
        </ChartCanvas>
      </div>
    }

    return <div>{buyChart} {sellChart}</div>
  }
}

OrdersChart = fitWidth(OrdersChart)

export default OrdersChart
