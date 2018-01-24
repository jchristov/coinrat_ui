// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import CandleSizeSelectComponent from "./CandleSizeSelectComponent"

it('renders correctly', () => {
  const onSelect = () => undefined
  const tree = renderer
    .create(<CandleSizeSelectComponent defaultSelectedAggregation="1-day" onSelect={onSelect}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
