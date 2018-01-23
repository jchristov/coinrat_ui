// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import CandleSizeSelectComponent from "./CandleSizeSelectComponent"

it.skip('renders correctly', () => {
  const onSelect = () => undefined
  global.document = {} // Todo: solve ReferenceError: document is not defined
  const tree = renderer
    .create(<CandleSizeSelectComponent defaultSelectedAggregation="1-day" onSelect={onSelect}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
