// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import type {AGGREGATION_UNIT} from "../../../../Candle/CandleSize/MainChartStore"
import {mainChartStoreInstance} from "../../../diContainer"
import CandleSizeSelectComponent from "../../../../Candle/CandleSize/CandleSizeSelectComponent"

class CandleSizeSelectContainer extends Component<{}> {

  changeAggregation = (candleSize: string) => {
    const [rawSize, unit]: [AGGREGATION_UNIT, string] = candleSize.split('-')
    mainChartStoreInstance.setCandleSize(unit, Number(rawSize))
  }

  render = () => {
    return <CandleSizeSelectComponent
      defaultSelectedAggregation={mainChartStoreInstance.candleSize}
      onSelect={this.changeAggregation}
    />
  }

}

export default observer(CandleSizeSelectContainer)
