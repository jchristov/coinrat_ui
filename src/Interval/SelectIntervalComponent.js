import React, {Component} from "react"
import {observer} from "mobx-react/index"
import {DateRangeInput} from "@blueprintjs/datetime"
import {Label} from "@blueprintjs/core/dist/components/forms/label"

const SelectIntervalComponent = observer(class SelectIntervalComponent extends Component {

  handleChange = (data) => {
    const since = data[0]
    const till = data[1]

    this.props.store.changeSelectedInterval({
      since: Object.prototype.toString.call(since) === '[object Date]' && !isNaN(since.getTime()) ? since : null,
      till: Object.prototype.toString.call(till) === '[object Date]' && !isNaN(till.getTime()) ? till : null,
    })
  }

  render() {
    const since = this.props.store.selectedInterval.since
    const till = this.props.store.selectedInterval.till

    return (
      <Label
        style={{verticalAlign: 'middle', lineHeight: 30 + 'px', display: 'inline', marginLeft: 7 + 'px'}}
        text="Interval:"
      >
        <div style={{marginLeft: 7 + 'px', display: 'inline'}}>
          <DateRangeInput
            format="YYYY-MM-DD HH:mm:ss"
            value={[since, till]}
            onChange={this.handleChange}
            allowSingleDayRange={true}
          />
        </div>
      </Label>
    )
  }
})

export default SelectIntervalComponent
