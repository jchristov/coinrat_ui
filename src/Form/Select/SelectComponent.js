// @flow
import classNames from 'classnames'
import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button, MenuItem, Classes, Spinner} from "@blueprintjs/core"
import {Box, Flex} from "reflexbox"
import FormItemComponent from "../FormItemComponent"

const ConcreateSelect = Select.ofType()

type SelectElement = {
  title: string,
  key: string,
  order: number,
}

type SelectItemsType = { [key: string]: SelectElement }

const SORTING_DESC = 'DESC'
const SORTING_ASC = 'ASC'

type Props = {
  items: SelectItemsType,
  selectedItem: ?SelectElement,
  label: string,
  onChange: (element: SelectElement) => void,
  isLoading: boolean,
  sort: SORTING_DESC | SORTING_ASC,
  disabled?: boolean,
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
    const value = !this.props.isLoading
      ? (item && Object.values(this.props.items).length > 0 ? item.title : 'Not selected')
      : <div style={{marginTop: 5 + 'px', marginBottom: -5 + 'px'}}><Spinner className="pt-small"/></div>

    return <Button disabled={this.props.disabled}>
      <Flex wrap={false}>
        <Box style={{whiteSpace: 'nowrap'}}>{value}</Box>
        <Box><span className="pt-icon-standard pt-icon-caret-down"/></Box>
      </Flex>
    </Button>
  }

  renderSelect() {
    const items = Object.values(this.props.items)
    items.sort((first: SelectElement, second: SelectElement) => {
      if (first.order === undefined) first.order = 0
      if (second.order === undefined) first.order = 0

      let result = 0
      if (first.order < second.order) result = -1
      if (first.order > second.order) result = 1

      return (this.props.sort === 'DESC' ? -1 : 1) * result
    })

    return <ConcreateSelect
      items={items}
      itemPredicate={this.filterItem}
      itemRenderer={this.renderItem}
      noResults={<MenuItem disabled text="No results."/>}
      onItemSelect={this.props.onChange}
      popoverProps={{popoverClassName: Classes.MINIMAL}}
      disabled={this.props.disabled}
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
  SORTING_ASC,
  SORTING_DESC,
  SelectComponent,
}
