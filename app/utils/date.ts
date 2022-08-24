
export const leftPad = (n: string | number): string => ('0' + n).slice(-2)

export const dateToISOString = (_ = new Date(), includeTime = false): string => {
  if (typeof _ === 'string') return (_ as string)?.substring(0, 10)
  const isoDate = [_.getFullYear(), leftPad(_.getMonth() + 1), leftPad(_.getDate())].join('-')
  return includeTime ? `${isoDate}T${[_.getHours(), _.getMinutes(), _.getSeconds()].map(leftPad).join(':')}` : isoDate
}