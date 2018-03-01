// @flow
type RawInterval = {
  since: string,
  till: string,
}

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
    return this.since === null || (this.till !== null && this.since.getTime() === this.till.getTime())
  }

  getAbsInSeconds() {
    if (this.since === null || this.till === 0) {
      return Number('Infinity')
    }
    const till = this.till !== null ? this.till : new Date()

    return (till.getTime() - this.since.getTime()) / 1000
  }
}

const deserialize_interval = (raw: RawInterval): Interval => {
  const since = raw.since !== null ? new Date(Date.parse(raw.since)) : null
  const till = raw.till !== null ? new Date(Date.parse(raw.till)) : null
  return new Interval(since, till)
}

export type {
  RawInterval,
}

export {
  Interval,
  deserialize_interval,
}
