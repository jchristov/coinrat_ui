import React, {Component} from "react"
import {STATUS_CANCELED, STATUS_CLOSED, STATUS_OPEN} from "../Orders/Order"
import {ORDERS_STATUS_COLORS} from "../Orders/ChartColors"
import HelpIconComponent from "../HelpIconComponent"

class LegendComponent extends Component<{}> {
  render() {
    const statuses = ORDERS_STATUS_COLORS

    const mockMarketTooltip = <div style={{maxWidth: 256 + 'px'}}>
      <p>Mock market is virtual market that simulates behaviour of stock-market.</p>
      <p>All orders are processed as <strong>closed</strong> immediately.</p>
    </div>

    return <div>
      <p>
        Strategy executed from UI is <strong>always</strong> executed against
        {' '}
        <strong>mock market</strong>
        {' '}
        <HelpIconComponent helpText={mockMarketTooltip}/>
        .
      </p>
      <p>Executing strategy against real market is possible only via command line on the backend server.</p>
      <h5>Legend</h5>
      <ul className="pt-list-unstyled">
        <li><span style={{color: statuses[STATUS_OPEN]}} className="pt-icon-full-circle"/> Open order</li>
        <li><span style={{color: statuses[STATUS_CLOSED]}} className="pt-icon-full-circle"/> Closed order</li>
        <li><span style={{color: statuses[STATUS_CANCELED]}} className="pt-icon-full-circle"/> Canceled order</li>
      </ul>
    </div>
  }
}

export default LegendComponent
