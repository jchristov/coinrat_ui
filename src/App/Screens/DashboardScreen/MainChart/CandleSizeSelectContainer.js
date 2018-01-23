// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import type {AGGREGATION_UNIT} from "../../../../Candle/CandleSize/CandleSizeStore"
import {candleSizeStoreInstance} from "../../../diContainer"
import CandleSizeSelectComponent from "../../../../Candle/CandleSize/CandleSizeSelectComponent"

class CandleSizeSelectContainer extends Component<{}> {

  changeAggregation = (candleSize: string) => {
    const [rawSize, unit]: [AGGREGATION_UNIT, string] = candleSize.split('-')
    candleSizeStoreInstance.setCandleSize(unit, Number(rawSize))
  }

  render = () => {
    return <CandleSizeSelectComponent
      defaultSelectedAggregation={candleSizeStoreInstance.candleSize}
      onSelect={this.changeAggregation}
    />
  }

}

export default observer(CandleSizeSelectContainer)
