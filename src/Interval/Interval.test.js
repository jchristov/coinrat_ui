// @flow
import Interval from "./Interval"

it('test interval', () => {
  expect(new Interval().isEmpty()).toBe(true)
  expect(new Interval().since).toBe(null)
  expect(new Interval().till).toBe(null)
  expect(new Interval().withClosedFromRight(new Date(2018, 1, 1, 1, 0, 0, 0)).till)
    .toEqual(new Date('2018-02-01T00:00:00.000Z'))

  expect(new Interval(new Date(2018, 1, 1, 0, 0, 0), new Date(2018, 1, 2, 0, 0, 0))
    .toIso()).toEqual({"since": new Date(2018, 1, 1, 1, 0, 0, 0), "till": new Date(2018, 1, 1, 2, 0, 0, 0)})
})
