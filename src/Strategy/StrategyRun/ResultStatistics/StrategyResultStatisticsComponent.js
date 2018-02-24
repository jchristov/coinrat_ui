// @flow
import React from "react"
import {StrategyRun} from "../StrategyRun"
import {Order} from "../../../Orders/Order"
import NumberComponent from "../../../Number/NumberComponent"

type Props = {
  strategyRun: StrategyRun,
  orders: Array<Order>,
}

const StrategyResultStatisticsComponent = ({strategyRun, orders}: Props) => {
  const numberOfTrades = orders.length
  const tradesPerDay = numberOfTrades / (strategyRun.getStrategyRunLengthInSeconds() / (24 * 60 * 60))
  const profitFactor = orders.length > 0
    ? orders[numberOfTrades - 1].getBaseCurrencyAmount() - orders[0].getBaseCurrencyAmount()
    : 0

  return <div style={{marginTop: 25 + 'px'}}>
    <h3>Statistics of strategy run</h3>
    <ul>
      <li>Number of trades: {numberOfTrades}</li>
      <li>Average trades per day: {tradesPerDay.toFixed(8)}</li>
      <li>Profit factor: <NumberComponent number={profitFactor} colored/></li>
      <li>Average profit per trade: --todo--</li>
      <li>Percent winning trades: --todo--</li>
    </ul>
  </div>
}

export default StrategyResultStatisticsComponent
