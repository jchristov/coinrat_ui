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
}

export default Interval
