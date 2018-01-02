// @flow
import React, {Component} from "react"
import {DateRangeInput} from "@blueprintjs/datetime"
import {Label} from "@blueprintjs/core"
import Interval from "./Interval"
import appMainToaster from "../Toaster"

type Props = {
  defaultSelectedInterval: Interval,
  onChange: (interval: Interval) => void,
}

class SelectIntervalComponent extends Component<Props> {
  props: Props

  handleChange = (data: Array<?Date>) => {
    let since = data[0]
    let till = data[1]
    since = Object.prototype.toString.call(since) === '[object Date]' && !isNaN(since.getTime()) ? since : null
    till = Object.prototype.toString.call(till) === '[object Date]' && !isNaN(till.getTime()) ? till : null

    if (since !== null && till !== null && since > till) {
      appMainToaster.show({message: "Since must be < than till.", className: 'pt-intent-danger'})
      return
    }

    this.props.onChange(new Interval(since, till))
  }

  render() {
    const interval = this.props.defaultSelectedInterval
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
}

export default SelectIntervalComponent
