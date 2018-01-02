// @flow
class Interval {
  since = null
  till = null

  constructor(since: ?Date = null, till: ?Date = null) {
    if (since !== null && till !== null && since > till) {
      throw Error('Since must be < than till')
    }

    this.since = since
    this.till = till
  }

  toIso = () => {
    return {
      since: this.since !== null ? this.since.toISOString() : null,
      till: this.till !== null ? this.till.toISOString() : null,
    }
  }

  withClosedFromRight = (date: Date) => {
    if (this.till === null) {
      const till = date > this.since ? date : this.since
      return new Interval(this.since, till)
    }
    return new Interval(this.since, this.till)
  }

  isEmpty = () => {
    return this.since.getTime() === this.till.getTime()
  }
}


export default Interval
