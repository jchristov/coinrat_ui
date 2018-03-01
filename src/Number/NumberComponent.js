// @flow
import React from "react"
import {Colors} from "@blueprintjs/core"

type Props = {
  number: Number,
  colored: boolean,
  forceColor: ?string,
  percent: boolean,
  suffix: ?string,
}

function calculateColor(number: Number, forceColor: ?string): string {
  if (forceColor !== null) {
    return forceColor
  }
  if (number > 0) {
    return Colors.GREEN1
  } else if (number < 0) {
    return Colors.RED1
  }
}

const NumberComponent = ({number, colored = false, percent = false, forceColor = null, suffix = null}: Props) => {
  const color = colored ? calculateColor(number, forceColor) : Colors.BLACK
  const numberToDisplay = percent ? number * 100 : number
  const suffixToDisplay = suffix !== null ? suffix : (percent ? '%' : '')
  const precision = percent ? 2 : 8

  return <span className="pt-monospace-text" style={{color: color}}>
    {numberToDisplay.toFixed(precision)}{suffixToDisplay}
  </span>
}

export default NumberComponent
