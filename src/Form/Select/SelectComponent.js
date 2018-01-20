// @flow
import * as classNames from "classnames"
import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button, MenuItem, Classes, Spinner} from "@blueprintjs/core"
import {Box, Flex} from "reflexbox"
import FormItemComponent from "../FormItemComponent"

const ConcreateSelect = Select.ofType()

type SelectElement = {
  title: string,
  key: string,
}

type SelectItemsType = { [key: string]: SelectElement }

type Props = {
  items: SelectItemsType,
  selectedItem: ?SelectElement,
  label: string,
  onChange: (element: SelectElement) => void,
}

class SelectComponent extends Component<Props> {
  renderItem = ({handleClick, isActive, item}: { handleClick: (any) => any, isActive: boolean, item: SelectElement }) => {
    const classes = classNames({
      [Classes.ACTIVE]: isActive,
      [Classes.INTENT_PRIMARY]: isActive,
    })

    return (
      <MenuItem
        className={classes}
        key={item.key}
        onClick={handleClick}
        text={item.title}
      />
    )
  }

  filterItem = (query: string, element: SelectElement, index: number) => {
    return `${index + 1}. ${element.title.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0
  }

  renderButton() {
    const item = this.props.selectedItem
    const value = item !== null
      ? item.title
      : <div style={{marginTop: 5 + 'px', marginBottom: -5 + 'px'}}><Spinner className="pt-small"/></div>

    return <Button>
      <Flex wrap={false}>
        <Box style={{whiteSpace: 'nowrap'}}>{value}</Box>
        <Box><span className="pt-icon-standard pt-icon-caret-down"/></Box>
      </Flex>
    </Button>
  }

  renderSelect() {
    return <ConcreateSelect
      items={Object.values(this.props.items)}
      itemPredicate={this.filterItem}
      itemRenderer={this.renderItem}
      noResults={<MenuItem disabled text="No results."/>}
      onItemSelect={this.props.onChange}
      popoverProps={{popoverClassName: Classes.MINIMAL}}
    >
      {this.renderButton()}
    </ConcreateSelect>
  }

  render() {
    return <FormItemComponent label={this.props.label} element={this.renderSelect()}/>
  }
}

export type {
  SelectItemsType,
  SelectElement,
}
export {
  SelectComponent,
}
