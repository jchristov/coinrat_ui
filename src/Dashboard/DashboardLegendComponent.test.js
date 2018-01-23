// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import DashboardLegendComponent from "./DashboardLegendComponent"

it('renders correctly when simulation mode is ON', () => {
  const tree = renderer.create(<DashboardLegendComponent isSimulationModeOn={true}/>).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly when simulation mode is OFF', () => {
  const tree = renderer.create(<DashboardLegendComponent isSimulationModeOn={false}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
