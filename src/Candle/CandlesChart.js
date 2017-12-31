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

    return (
      <ChartCanvas
        height={400}
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
        <Chart id={1} yExtents={(candle: Candle) => [candle.high, candle.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis axisAt="left" orient="left" ticks={5}/>
          <CandlestickSeries/>
        </Chart>
      </ChartCanvas>
    )
  }
}

CandlesChart = fitWidth(CandlesChart)

export default CandlesChart
