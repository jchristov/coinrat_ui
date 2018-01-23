import React from "react"
import {strategyRunnerStoreInstance} from "../diContainer"
import RunStrategyButtonComponent from "../../Strategy/RunStrategyButtonComponent"

const RunStrategyButtonContainer = () => {
  return <RunStrategyButtonComponent onClick={strategyRunnerStoreInstance.runStrategy}/>
}

export default RunStrategyButtonContainer
