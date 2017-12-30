// @flow
import React, {Component} from "react"
import {observer} from "mobx-react/index"
import {DateRangeInput} from "@blueprintjs/datetime"
import {Label} from "@blueprintjs/core/dist/components/forms/label"
import Interval from "./Interval"
import {FilterStore} from "../TopLineToolbar/FilterStore"

type Props = {
  store: FilterStore,
}

const SelectIntervalComponent = observer(class SelectIntervalComponent extends Component {
  props: Props

  handleChange = (data: Array<?Date>) => {
    const since = data[0]
    const till = data[1]

    this.props.store.changeSelectedInterval(new Interval(
      Object.prototype.toString.call(since) === '[object Date]' && !isNaN(since.getTime()) ? since : null,
      Object.prototype.toString.call(till) === '[object Date]' && !isNaN(till.getTime()) ? till : null,
      )
    )
  }

  render() {
    const interval = this.props.store.selectedInterval
    return (
      <Label
        style={{verticalAlign: 'middle', lineHeight: 30 + 'px', display: 'inline', marginLeft: 7 + 'px'}}
        text="Interval:"
      >
        <div style={{marginLeft: 7 + 'px', display: 'inline'}}>
          <DateRangeInput
            format="YYYY-MM-DD HH:mm:ss"
            value={[interval.since, interval.till]}
            onChange={this.handleChange}
            allowSingleDayRange={true}
          />
        </div>
      </Label>
    )
  }
})

export default SelectIntervalComponent
