// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import NumberComponent from "./NumberComponent"
import {Colors} from "@blueprintjs/core"

it('renders correctly - uncolored', () => {
  const tree = renderer
    .create(<NumberComponent number={1.2456598}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly - colored - positive', () => {
  const tree = renderer
    .create(<NumberComponent number={1.2456598} colored/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly - colored - negative', () => {
  const tree = renderer
    .create(<NumberComponent number={-1.24565986467897651321} colored/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly - percent', () => {
  const tree = renderer
    .create(<NumberComponent number={-1.24565986467897651321} colored percent/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly - suffix, forceColor', () => {
  const tree = renderer
    .create(<NumberComponent number={-1.24} colored forceColor={Colors.BLUE1} percent suffix={'yolo'}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

