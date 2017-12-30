import React, {Component} from "react"
import {Button} from "@blueprintjs/core/dist/components/button/buttons"

class RunStrategyButtonComponent extends Component {

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
