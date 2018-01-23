// @flow
import type {SelectElement} from "../Form/Select/SelectComponent"

const loadDataForSelectElementStore = (
  socket,
  method: string,
  fromRawData: (Object) => Object,
  resultCallback: (Object) => void,
  emitParams = {}
): Array<SelectElement> => {
  socket.emit(method, emitParams, (status: String, rawObjects: Array<Object>) => {
    console.log('Received:', method, Object.values(rawObjects).length)
    const array = rawObjects.map((rawObject: Object) => fromRawData(rawObject))
    resultCallback(array.reduce((result, item: SelectElement) => ({...result, [item.key]: item}), {}))
  })
}

export default loadDataForSelectElementStore
