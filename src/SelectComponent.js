import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button, MenuItem, Classes, Label} from "@blueprintjs/core"

const ConcreateSelect = Select.ofType()

class SelectComponent extends Component {
  renderPair({handleClick, isActive, item}) {
    return (
      <MenuItem
        className={Classes.ACTIVE}
        key={item.key}
        onClick={handleClick}
        text={item.title}
      />
    )
  }

  filterPair(query, pair, index) {
    return `${index + 1}. ${pair.title.toLowerCase()} ${pair.year}`.indexOf(query.toLowerCase()) >= 0
  }

  render() {
    return (
      <Label
        style={{verticalAlign: 'middle', lineHeight: 30 + 'px', display: 'inline', marginLeft: 7 + 'px'}}
        text={`${this.props.label}:`}
      >
        <div style={{marginLeft: 7 + 'px', display: 'inline'}}>
          <ConcreateSelect
            items={Object.values(this.props.items)}
            itemPredicate={this.filterPair}
            itemRenderer={this.renderPair}
            noResults={<MenuItem disabled text="No results."/>}
            onItemSelect={this.props.onChange}
          >
            <Button rightIconName="caret-down" text={this.props.selectedItem.title}/>
          </ConcreateSelect>
        </div>
      </Label>
    )
  }
}

export default SelectComponent
