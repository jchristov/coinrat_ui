const upperCaseAll = (text: string): string => text.replace(/(?:^|\s)\S/g, function (a) {
  return a.toUpperCase()
})
const underscoreToSpaces = (text: string): string => text.replace(/[_\-]/g, ' ')
const convertKeyToName = (key: string): string => upperCaseAll(underscoreToSpaces(key))

export {
  upperCaseAll,
  underscoreToSpaces,
  convertKeyToName,
}
