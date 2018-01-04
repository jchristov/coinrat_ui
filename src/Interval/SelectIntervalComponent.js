// @flow
import React, {Component} from "react"
import {DateRangeInput} from "@blueprintjs/datetime"
import {Label} from "@blueprintjs/core"
import Interval from "./Interval"
import appMainToaster from "../Toaster"
import {Box, Flex} from "reflexbox"

type Props = {
  defaultSelectedInterval: Interval,
  onChange: (interval: Interval) => void,
}

const lineStyles = {
  verticalAlign: 'middle',
  lineHeight: 30 + 'px',
  display: 'inline',
  marginLeft: 7 + 'px',
  minWidth: 120 + 'px',
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
    return <Flex>
      <Box w={120} style={{textAlign: 'right', ...lineStyles}}>
        <Label text='Interval:'/>
      </Box>
      <Box style={{textAlign: 'left', ...lineStyles}}>
        <DateRangeInput
          format="YYYY-MM-DD HH:mm:ss"
          value={[interval.since, interval.till]}
          onChange={this.handleChange}
          allowSingleDayRange={true}
        />
      </Box>
    </Flex>
  }
}

export default SelectIntervalComponent
