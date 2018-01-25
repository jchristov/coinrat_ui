// @flow
import {action, extendObservable} from "mobx"
import type {AGGREGATION_UNIT} from "../Candle/CandleSize/CandleSize"
import type {CHART_TYPES} from "../CandlestickChart/ChartType"


class MainChartStore {
  unit: AGGREGATION_UNIT
  size: number
  candleSize: string
  chartType: CHART_TYPES

  constructor(unit: AGGREGATION_UNIT, size: number, chartType: CHART_TYPES) {
    extendObservable(this, {
      unit: unit,
      size: size,
      candleSize: `${unit}-${size}`,
      chartType: chartType,
    })
    this._concatCandleSize()
  }

  setCandleSize = action((unit: AGGREGATION_UNIT, aggregationSize: number) => {
    this.unit = unit
    this.size = aggregationSize
    this._concatCandleSize()
  })

  setChartType = action((chartType: CHART_TYPES) => {
    this.chartType = chartType
  })

  _concatCandleSize = () => {
    this.candleSize = `${this.size}-${this.unit}`
  }
}

export {
  MainChartStore,
}
