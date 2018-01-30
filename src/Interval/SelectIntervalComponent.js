// @flow
import React, {Component} from "react"
import {DateRangeInput} from "@blueprintjs/datetime"
import {Interval} from "./Interval"
import FormItemComponent from "../Form/FormItemComponent"
import type {FlashMessageHandlerType} from "../FlashMessage/handling"

type Props = {
  defaultSelectedInterval: Interval,
  onChange: (interval: Interval) => void,
  flashMessageHandler: FlashMessageHandlerType,
}

class SelectIntervalComponent extends Component<Props> {
  props: Props

  handleChange = (data: Array<?Date>) => {
    let since = data[0]
    let till = data[1]
    since = Object.prototype.toString.call(since) === '[object Date]' && !isNaN(since.getTime()) ? since : null
    till = Object.prototype.toString.call(till) === '[object Date]' && !isNaN(till.getTime()) ? till : null

    if (since !== null && till !== null && since > till) {
      this.props.flashMessageHandler("Since must be < than till.", 'pt-intent-danger')
      return
    }

    this.props.onChange(new Interval(since, till))
  }

  render() {
    const interval = this.props.defaultSelectedInterval
    const element = <DateRangeInput
      format="YYYY-MM-DD HH:mm:ss"
      value={[interval.since, interval.till]}
      onChange={this.handleChange}
      allowSingleDayRange={true}
    />
    return <FormItemComponent label="Interval" element={element}/>
  }
}

export default SelectIntervalComponent
