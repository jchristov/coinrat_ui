// @flow
import React, {Component} from 'react'
import {ChartCanvas, Chart} from "react-stockcharts"
import {GroupedBarSeries} from "react-stockcharts/lib/series"
import {XAxis, YAxis} from "react-stockcharts/lib/axes"
import {fitWidth} from "react-stockcharts/lib/helper"
import {scaleTime} from "d3-scale"
import Interval from "../Interval/Interval"
import {Order} from "./Order"
import {ORDERS_DIRECTION_COLORS, ORDERS_STATUS_COLORS} from "./ChartColors"

type Props = {
  data: Array<Order>,
  width: number,
  ratio: number,
  type: 'svg' | 'hybrid',
  interval: Interval,
}

class OrdersChart extends Component<Props> {
  props: Props

  getColorForOrder = (order: Order, i) => {
    if (i === 0) {
      return ORDERS_DIRECTION_COLORS[order.direction]
    }
    if (i === 1) {
      return ORDERS_STATUS_COLORS[order.status]
    }
  }

  render() {
    const {type, data, width, ratio, interval} = this.props
    const xAccessor = (order: Order) => order.createdAt

    return (
      <ChartCanvas
        mouseMoveEvent={false}
        zoomEvent={false}
        panEvent={false}
        height={100}
        ratio={ratio}
        width={width}
        margin={{left: 50, right: 50, top: 10, bottom: 30}}
        type={type}
        seriesName="MSFT"
        data={data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        xExtents={[interval.since, interval.till]}
      >
        <Chart id={1} yExtents={() => [0, 1]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis axisAt="left" orient="left" ticks={1}/>
          <GroupedBarSeries
            yAccessor={[() => 1, () => 2]}
            fill={this.getColorForOrder}
            width={8}
            spaceBetweenBar={2}
          />
        </Chart>
      </ChartCanvas>
    )
  }
}

OrdersChart = fitWidth(OrdersChart)

export default OrdersChart
