// @flow
import React, {Component} from "react"
import {StrategyRunnerStore} from "./StrategyRunnerStore"
import {Button} from "@blueprintjs/core"

type Props = {
  store: StrategyRunnerStore
}

class RunStrategyButtonComponent extends Component {
  props: Props

  render() {
    return <Button
      style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
      className="pt-intent-primary"
      iconName="pt-icon-play"
      onClick={this.props.store.runStrategy}
    >
      Run strategy
    </Button>
  }
}

export default RunStrategyButtonComponent
