import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button} from "@blueprintjs/core/dist/components/button/buttons"
import {MenuItem} from "@blueprintjs/core/dist/components/menu/menuItem"
import * as Classes from "@blueprintjs/core/dist/common/classes"
import {observer} from "mobx-react/index"

const MarketSelect = Select.ofType()

const SelectMarketComponent = observer(class SelectMarketComponent extends Component {
  renderMarket({handleClick, isActive, item}) {
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

  filterMarket(query, market, index) {
    return `${index + 1}. ${market.title.toLowerCase()} ${market.year}`.indexOf(query.toLowerCase()) >= 0
  }

  handleValueChange = (market) => this.props.store.changeSelectedMarket(market.key)

  render() {
    const selectedMarket = this.props.store.selectedMarket

    const markets = {
      'bittrex': {key: 'bittrex', title: 'Bittrex'},
      'bitfinex': {key: 'bitfinex', title: 'Bitfinex'},
    }

    const item = markets[selectedMarket]

    return (
      <MarketSelect
        items={Object.values(markets)}
        itemPredicate={this.filterMarket}
        itemRenderer={this.renderMarket}
        noResults={<MenuItem disabled text="No results."/>}
        onItemSelect={this.handleValueChange}
      >
        <Button rightIconName="caret-down" text={item.title}/>
      </MarketSelect>
    )
  }
})

export default SelectMarketComponent
