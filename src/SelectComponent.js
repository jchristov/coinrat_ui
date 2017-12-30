// @flow
import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button, MenuItem, Classes, Label} from "@blueprintjs/core"

const ConcreateSelect = Select.ofType()

type SelectElement = {
  title: string,
  key: string,
}

class SelectComponent extends Component {
  renderPair({handleClick, isActive, item}: { handleClick: (any) => any, isActive: boolean, item: SelectElement }) {
    return (
      <MenuItem
        className={Classes.ACTIVE}
        key={item.key}
        onClick={handleClick}
        text={item.title}
      />
    )
  }

  filterPair(query: string, element: SelectElement, index: number) {
    return `${index + 1}. ${element.title.toLowerCase()} ${element.year}`.indexOf(query.toLowerCase()) >= 0
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

export {
  SelectComponent,
  SelectElement,
}
