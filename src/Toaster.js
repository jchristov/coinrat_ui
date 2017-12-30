// @flow
import {Position, Toaster} from "@blueprintjs/core/dist/esm/index"

const appMainToaster = Toaster.create({
  className: "app-main-toaster",
  position: Position.TOP_RIGHT,
  container: document.body
})

export default appMainToaster
