// @flow
import {Interval} from "./Interval"

it('test interval', () => {
  expect(new Interval().isEmpty()).toBe(true)
  expect(new Interval().since).toBe(null)
  expect(new Interval().till).toBe(null)
  expect(new Interval().getAbsInSeconds()).toBe(Number('Infinity'))

  const newTill = new Date(Date.UTC(2018, 1, 1, 0, 0, 0))
  expect(new Interval().withClosedFromRight(newTill).till).toEqual(newTill)
  expect(
    (
      new Interval(
        new Date(Date.UTC(2018, 0, 1, 0, 0, 0)),
        new Date(Date.UTC(2018, 0, 2, 0, 0, 0))
      )
    ).toIso()
  )
    .toEqual({"since": "2018-01-01T00:00:00.000Z", "till": "2018-01-02T00:00:00.000Z"})

  expect((
    new Interval(
      new Date(Date.UTC(2018, 0, 1, 0, 0, 0)),
      new Date(Date.UTC(2018, 0, 2, 0, 0, 0))
    )
  ).getAbsInSeconds()).toBe(60 * 60 * 24)
})
