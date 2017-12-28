import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button} from "@blueprintjs/core/dist/components/button/buttons"
import {MenuItem} from "@blueprintjs/core/dist/components/menu/menuItem"
import * as Classes from "@blueprintjs/core/dist/common/classes"
import {observer} from "mobx-react/index"

const PairSelect = Select.ofType()

const SelectPairComponent = observer(class SelectPairComponent extends Component {
  renderPair({handleClick, isActive, item}) {
    return (
      <MenuItem
        className={Classes.ACTIVE}
        label={item.title}
        key={item.key}
        onClick={handleClick}
        text={item.title}
      />
    )
  }

  filterPair(query, pair, index) {
    return `${index + 1}. ${pair.title.toLowerCase()} ${pair.year}`.indexOf(query.toLowerCase()) >= 0
  }

  handleValueChange = (pair) => this.props.store.changeSelectedPair(pair.key)

  render() {
    const selectedPair = this.props.store.selectedPair

    const pairs = {
      'USD_BTC': {key: 'USD_BTC', title: 'USD-BTC'},
      'USD_LTC': {key: 'USD_LTC', title: 'USD-LTC'},
      'USD_ETH': {key: 'USD_ETH', title: 'USD-ETH'},
    }

    const item = pairs[selectedPair]

    return (
      <PairSelect
        items={Object.values(pairs)}
        itemPredicate={this.filterPair}
        itemRenderer={this.renderPair}
        noResults={<MenuItem disabled text="No results."/>}
        onItemSelect={this.handleValueChange}
      >
        <Button rightIconName="caret-down" text={item.title}/>
      </PairSelect>
    )
  }
})

export default SelectPairComponent
