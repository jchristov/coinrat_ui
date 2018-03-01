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
  const hodlProfitFactor = orders.length > 0
    ? (orders[0].getMarketCurrencyAmount() * orders[orders.length - 1].rate) - orders[0].getBaseCurrencyAmount()
    : 0

  let profitFactor = 0
  let numberOfWinningTrades = 0
  let lastOrder: ?Order = null

  const orderProfit: Array<Number> = []

  for (let i = 0; i < orders.length; i++) {
    if (lastOrder !== null) {
      const profitOrLoss =
        orders[i].getTotalAfterOrderInBaseCurrency()
        - lastOrder.getTotalAfterOrderInBaseCurrency()
      if (profitOrLoss > 0) {
        numberOfWinningTrades++
      }
      profitFactor += profitOrLoss
      orderProfit[i] = profitOrLoss
    }
    lastOrder = orders[i]
  }


  const averageProfitPerTrade = profitFactor / numberOfTrades

  const standardDeviation = Math.sqrt(
    (1 / numberOfTrades)
    * orderProfit.reduce((accumulator, currentValue) => {
      return accumulator + Math.pow(currentValue - averageProfitPerTrade, 2)
    },
    0)
  )

  return <div style={{marginTop: 25 + 'px'}}>
    <h3>Statistics of strategy run</h3>
    <ul>
      <li>Number of trades: <NumberComponent number={numberOfTrades}/></li>
      <li>Average trades per day: <NumberComponent number={tradesPerDay}/></li>
      <li>Profit: <NumberComponent number={profitFactor} colored suffix={strategyRun.getBaseCurrencyName()}/></li>
      <li>
        Profitability against HODL:{' '}
        <NumberComponent number={profitFactor / hodlProfitFactor} colored percent/>{' '}
        (Hodl profit factor would be:{' '}
        <NumberComponent number={hodlProfitFactor} colored suffix={strategyRun.getBaseCurrencyName()}/>)
      </li>
      <li>
        Average profit per trade:{' '}
        <NumberComponent number={averageProfitPerTrade} colored suffix={strategyRun.getBaseCurrencyName()}/>
      </li>
      <li>Percent winning trades: <NumberComponent number={(numberOfWinningTrades / numberOfTrades)} percent/></li>
      <li>
        Standard deviation:{' '}
        <NumberComponent number={standardDeviation} suffix={strategyRun.getBaseCurrencyName()}/>
      </li>
    </ul>
  </div>
}

export default StrategyResultStatisticsComponent
