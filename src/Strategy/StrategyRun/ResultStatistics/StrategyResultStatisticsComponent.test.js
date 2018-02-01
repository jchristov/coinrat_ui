// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import StrategyResultStatisticsComponent from "./StrategyResultStatisticsComponent"

it('renders correctly', () => {
  const tree = renderer
    .create(
      <StrategyResultStatisticsComponent/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
