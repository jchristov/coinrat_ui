// @flow
import React, {Component} from "react"
import {Select} from "@blueprintjs/labs"
import {Button, MenuItem, Classes, Label, Spinner} from "@blueprintjs/core"
import {Box, Flex} from "reflexbox"

const ConcreateSelect = Select.ofType()

type SelectElement = {
  title: string,
  key: string,
}

type DefaultSelectDataType = { [key: string]: SelectElement }

type Props = {
  items: { [key: string]: SelectElement },
  selectedItem: ?SelectElement,
  label: string,
  onChange: (element: SelectElement) => void,
}

const lineStyles = {
  verticalAlign: 'middle',
  lineHeight: 30 + 'px',
  display: 'inline',
  marginLeft: 7 + 'px',
}

class SelectComponent extends Component<Props> {
  renderPair = ({handleClick, isActive, item}: { handleClick: (any) => any, isActive: boolean, item: SelectElement }) => {
    return (
      <MenuItem
        className={Classes.ACTIVE}
        key={item.key}
        onClick={handleClick}
        text={item.title}
      />
    )
  }

  filterPair = (query: string, element: SelectElement, index: number) => {
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
      itemPredicate={this.filterPair}
      itemRenderer={this.renderPair}
      noResults={<MenuItem disabled text="No results."/>}
      onItemSelect={this.props.onChange}
    >
      {this.renderButton()}
    </ConcreateSelect>
  }

  render() {
    return <Flex>
      <Box w={120} style={{textAlign: 'right', ...lineStyles}}>
        <Label text={`${this.props.label}:`}/>
      </Box>
      <Box auto style={{textAlign: 'left', ...lineStyles}}>
        {this.renderSelect()}
      </Box>
    </Flex>
  }
}

export {
  SelectComponent,
  SelectElement,
  DefaultSelectDataType,
}
