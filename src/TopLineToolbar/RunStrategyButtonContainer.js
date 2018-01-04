import React from "react"
import {strategyRunnerStoreInstance} from "../Strategy/StrategyRunnerStore"
import RunStrategyButtonComponent from "../Strategy/RunStrategyButtonComponent"

const RunStrategyButtonContainer = () => {
  return <RunStrategyButtonComponent onClick={strategyRunnerStoreInstance.runStrategy}/>
}

export default RunStrategyButtonContainer
