// @flow
import React, {Component} from "react"
import {Button} from "@blueprintjs/core/dist/components/button/buttons"
import {OrderStore} from "./OrderStore"

type Props = {
  store: OrderStore,
}

class CleanOrderStorageButtonComponent extends Component {
  props: Props

  render() {
    return <Button
      style={{marginTop: 1 + 'px', marginLeft: 7 + 'px'}}
      className="pt-intent-danger"
      iconName="pt-icon-eraser"
      onClick={this.props.store.clear()}
    >
      Clean order storage
    </Button>
  }
}

export default CleanOrderStorageButtonComponent
