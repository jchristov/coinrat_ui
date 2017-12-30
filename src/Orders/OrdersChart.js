import React, {Component} from 'react'
import PropTypes from "prop-types"
import {ChartCanvas, Chart} from "react-stockcharts"
import {BarSeries} from "react-stockcharts/lib/series"
import {XAxis, YAxis} from "react-stockcharts/lib/axes"
import {fitWidth} from "react-stockcharts/lib/helper"
import {scaleTime} from "d3-scale"

class OrdersChart extends Component {
  render() {
    const {type, data, width, ratio, since, till} = this.props
    const xAccessor = d => d.date
    const xExtents = [since, till]

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
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [0, d.volume]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
          <YAxis axisAt="left" orient="left" ticks={1}/>
          <BarSeries yAccessor={d => d.volume}/>
        </Chart>
      </ChartCanvas>
    )
  }
}

OrdersChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
  since: PropTypes.instanceOf(Date).isRequired,
  till: PropTypes.instanceOf(Date).isRequired,
}

OrdersChart.defaultProps = {type: "svg"}
OrdersChart = fitWidth(OrdersChart)

export default OrdersChart
