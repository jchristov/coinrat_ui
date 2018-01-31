import React from "react"
import {filterStoreInstance, orderStoreInstance} from "../diContainer"
import ResetStrategyRunButtonComponent from "../../Strategy/ResetStrategyRunButtonComponent"

const ResetStrategyRunButtonContainer = () => {
  return <ResetStrategyRunButtonComponent onClick={() => {
    filterStoreInstance.changeStrategyRun(null)
    orderStoreInstance.reloadByFilter(filterStoreInstance)
  }}/>
}

export default ResetStrategyRunButtonContainer
