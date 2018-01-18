// @flow

class Balance {
  currency: string
  availableAmount: string

  constructor(currency: string, availableAmount: string) {
    this.currency = currency
    this.availableAmount = availableAmount
  }
}

export {
  Balance,
}
