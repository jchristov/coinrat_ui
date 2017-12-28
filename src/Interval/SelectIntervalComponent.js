import React, {Component} from "react"
import {observer} from "mobx-react/index"
import {DateRangeInput} from "@blueprintjs/datetime"

const SelectIntervalComponent = observer(class SelectIntervalComponent extends Component {

  handleChange = (data) => this.props.store.changeSelectedInterval({since: data[0], till: data[1]})

  render() {
    const since = this.props.store.selectedInterval.since
    const till = this.props.store.selectedInterval.till

    return (
      <DateRangeInput
        format="YYYY-MM-DD HH:mm:ss"
        value={[since, till]}
        onChange={this.handleChange}
        allowSingleDayRange={true}
      />
    )
  }
})

export default SelectIntervalComponent
