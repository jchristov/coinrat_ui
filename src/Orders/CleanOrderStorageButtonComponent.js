import React, {Component} from "react"
import {Button} from "@blueprintjs/core/dist/components/button/buttons"

class CleanOrderStorageButtonComponent extends Component {

  render() {
    return <Button className="pt-intent-danger" iconName="pt-icon-eraser">Clean order storage</Button>
  }
}

export default CleanOrderStorageButtonComponent
