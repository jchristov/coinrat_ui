// @flow
import React from "react"
import {StrategyRun} from "../StrategyRun"
import {Order} from "../../../Orders/Order"

type Props = {
  strategyRun: StrategyRun,
  orders: Array<Order>,
}

const StrategyResultStatisticsComponent = ({strategyRun, orders}: Props) => {
  const numberOfTrades = orders.length
  const tradesPerDay = numberOfTrades / (strategyRun.getStrategyRunLengthInSeconds() / (24 * 60 * 60))

  return <div style={{marginTop: 25 + 'px'}}>
    <h3>Statistics of strategy run</h3>
    <ul>
      <li>Number of trades: {numberOfTrades}</li>
      <li>Average trades per day: {tradesPerDay.toFixed(8)}</li>
    </ul>
  </div>
}

export default StrategyResultStatisticsComponent
