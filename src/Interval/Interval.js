// @flow
class Interval {
 constructor(since: ?Date = null, till: ?Date = null) {
  if (since !== null && till !== null && since > till) {
   throw Error('Since must be < than till')
  }

  this.since = since
  this.till = till
 }
}

export default Interval
