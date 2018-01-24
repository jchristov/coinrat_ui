// @flow
import Interval from "./Interval"

it('test interval', () => {
  expect(new Interval().isEmpty()).toBe(true)
  expect(new Interval().since).toBe(null)
  expect(new Interval().till).toBe(null)
  expect(new Interval().withClosedFromRight(new Date(2018, 1, 1, 1)).till)
    .toEqual(new Date('2018-02-01T00:00:00.000Z'))

  expect(new Interval(new Date(2018, 1, 1), new Date(2018, 1, 2))
    .toIso()).toEqual({"since": "2018-01-31T23:00:00.000Z", "till": "2018-02-01T23:00:00.000Z"})
})
