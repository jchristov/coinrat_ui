import React, {Component} from 'react'
import {observer} from "mobx-react"
import SelectPairComponent from "../Pair/SelectPairComponent"
import SelectMarketComponent from "../Market/SelectMarketComponent"
import SelectIntervalComponent from "../Interval/SelectIntervalComponent"

const FilterComponent = observer(class FilterComponent extends Component {

  render() {
    return (
      <div>
        <SelectPairComponent store={this.props.store}/>
        <SelectMarketComponent store={this.props.store}/>
        <SelectIntervalComponent store={this.props.store}/>
      </div>
    )
  }

})


export default FilterComponent
