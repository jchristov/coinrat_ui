// @flow
import React from "react"
import {Colors} from "@blueprintjs/core"

type Props = {
  number: Number,
  colored: boolean
}

const NumberComponent = ({number, colored = false}: Props) => {
  let color = Colors.BLACK
  if (colored) {
    if (number > 0) {
      color = Colors.GREEN1
    } else if (number < 0) {
      color = Colors.RED1
    }
  }

  return <span className="pt-monospace-text" style={{color: color}}>{number.toFixed(8)}</span>
}

export default NumberComponent
