const upperCaseFirst = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1)
const underscoreToSpaces = (text: string): string => text.replace('_', ' ')

const convertKeyToName = (key: string): string => underscoreToSpaces(upperCaseFirst(key))

export {
  upperCaseFirst,
  underscoreToSpaces,
  convertKeyToName,
}
