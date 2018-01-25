// @flow
import React from "react"
import {observer} from "mobx-react"
import {Switch} from "@blueprintjs/core"
import {mainChartStoreInstance} from "../../../diContainer"
import {CHART_HEIKIN_ASHI_CANDLE, CHART_STANDARD_CANDLE} from "../../../../CandlestickChart/ChartType"
import {Tooltip2} from "@blueprintjs/labs"

const ChartTypeSwitcherContainer = () => {
  const isHeikinAshiOn = mainChartStoreInstance.chartType === CHART_HEIKIN_ASHI_CANDLE

  const handleSwitch = () => {
    if (isHeikinAshiOn) {
      mainChartStoreInstance.setChartType(CHART_STANDARD_CANDLE)
    } else {
      mainChartStoreInstance.setChartType(CHART_HEIKIN_ASHI_CANDLE)
    }
  }

  return <Tooltip2 content={isHeikinAshiOn ? "Switch back to standard candles." : "Switch to Heikin-Ashi candles."}>
    <Switch
      style={{marginTop: 9 + 'px', marginLeft: 12 + 'px'}}
      defaultChecked={isHeikinAshiOn}
      label={isHeikinAshiOn ? "Heikin Ashi" : "Standard"}
      onChange={handleSwitch}
    />
  </Tooltip2>
}

export default observer(ChartTypeSwitcherContainer)
