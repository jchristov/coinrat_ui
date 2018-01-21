// @flow
import React, {Component} from 'react'
import {observer} from "mobx-react"
import {filterStoreInstance} from "./../TopLineToolbar/FilterStore"
import DashboardComponent from "./DashboardComponent"
import {candleSizeStoreInstance} from "../Candle/CandleSize/CandleSizeStore"

class DashboardContainer extends Component<{}> {
  render = () => <DashboardComponent {...filterStoreInstance} candleSize={candleSizeStoreInstance.candleSize}/>
}

export default observer(DashboardContainer)
