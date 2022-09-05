/**
 * @desc-check if string is an alphanumeric (a-z or A-Z) or an empty space ( )
 */
export default function myIsAlpha(str: string){
  for(const c of str){
    const toAsciiDecimal = c.charCodeAt(0)
    if(!(toAsciiDecimal<91 && toAsciiDecimal>64) &&
      !(toAsciiDecimal<123 && toAsciiDecimal>96) &&
      toAsciiDecimal!==32
    ) return false
  }
  return true
}