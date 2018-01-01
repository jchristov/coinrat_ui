const aggregateDateSecond = (date: Date): Date => {
 const clonedDate = new Date(date.getTime())
 clonedDate.setSeconds(0)
 return clonedDate
}

const calculateAggregateHash = (date: Date): string => {
 function str_pad(n) {
  return String('00' + n).slice(-2)
 }

 return `${date.getFullYear()}-${str_pad(date.getMonth() + 1)}-${str_pad(date.getDate())} `
   + `${str_pad(date.getHours())}:${str_pad(date.getMinutes())}:${str_pad(date.getSeconds())}`
}

export {
 calculateAggregateHash,
 aggregateDateSecond,
}
