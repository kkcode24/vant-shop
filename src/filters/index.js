import confiog from '@/utils/config'
function loadImg(url) {
  return confiog.prefixAttachs + url
}

/**
 * 分转化为元
 */
export function amount(number){
  return isNaN(number) ? 0.00 : Number(number).toFixed(2)
}
