import dayjs from 'dayjs'

// tslint:disable-next-line: no-unused-expression
export const commaNumber = (n, fixed = true) => {
  if (Number(n) % 1 !== 0 && !fixed) {
    return Number(n).toString().replace(
      /(\d)(?=(?:\d{3})+(?:\.|$))|(\.[0-9]+)\d*$/g,
      (_m, s1, s2) => s2 || (s1 + ','))
  }

  return Number(n).toFixed(2).replace(
    /(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d\d?)\d*$/g,
    (_m, s1, s2) => s2 || (s1 + ','))
}

export const formatDate = input => dayjs(input).format('dddd, MMMM DD, YYYY')
