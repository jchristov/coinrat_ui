// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {Flex, Box} from 'reflexbox'
import {NonIdealState} from "@blueprintjs/core"
import {
  filterStoreInstance,
  candleStoreInstance,
  orderStoreInstance,
  simulationModeStoreInstance,
  mainChartStoreInstance,
} from "../../diContainer"
import {createAggregateFromData} from "../../../MainChart/ChartAggregate"
import CandlesChartComponent from "../../../MainChart/CandlesChartComponent"
import CandleSizeSelectContainer from "./MainChart/CandleSizeSelectContainer"
import DashboardLegendComponent from "../../../Dashboard/DashboardLegendComponent"
import ChartTypeSwitcherContainer from "./MainChart/ChartTypeSwitcherContainer"
import {CHART_HEIKIN_ASHI_CANDLE} from "../../../CandlestickChart/ChartType"

const CandlestickChartComponent = observer(class CandlestickChartComponent extends Component<{}> {

  renderChart = () => {
    const interval = filterStoreInstance.interval.withClosedFromRight(new Date())

    const candles = Object.values(candleStoreInstance.candles.toJS())
    const buyOrders = Object.values(orderStoreInstance.buyOrders.toJS())
    const sellOrders = Object.values(orderStoreInstance.sellOrders.toJS())
    const dataArray = createAggregateFromData(candles, buyOrders, sellOrders)

    if (dataArray.data.length <= 1 || interval.isEmpty()) {
      return <div style={{marginTop: 25 + 'px'}}>
        <NonIdealState
          visual="search"
          title="No candles."
          description={<span>Does backend synchronize this pair from the selected market?</span>}
        />
      </div>
    }

    return <CandlesChartComponent
      type="svg"
      result={dataArray}
      interval={interval}
      isHeikinAshiOn={mainChartStoreInstance.chartType === CHART_HEIKIN_ASHI_CANDLE}
    />
  }

  render() {
    return <Flex align='center top'>
      <Box auto>
        <Flex column align='center top'>
          <Box>
            <Flex>
              <Box><CandleSizeSelectContainer/></Box>
              <Box><ChartTypeSwitcherContainer/></Box>
            </Flex>
          </Box>
          <Box>{this.renderChart()}</Box>
        </Flex>
      </Box>
      <Box style={{paddingRight: 10 + 'px'}} w={256}>
        <DashboardLegendComponent isSimulationModeOn={simulationModeStoreInstance.isSimulationModeEnabled}/>
      </Box>
    </Flex>
  }
})


export default CandlestickChartComponent
