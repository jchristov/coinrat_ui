// @flow
import React from "react"

type Props = {
 color: string
}

const ColoredDotComponent = ({color}: Props) => {
 return <span className="pt-icon pt-icon-dot" style={{color: color}}/>
}

export default ColoredDotComponent
