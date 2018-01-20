// @flow
import {Position, Toaster} from "@blueprintjs/core"

const appMainToaster = Toaster.create({
  className: "app-main-toaster",
  position: Position.TOP_RIGHT,
  container: document.body
})

export default appMainToaster
