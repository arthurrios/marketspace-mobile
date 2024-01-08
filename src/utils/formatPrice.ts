export function formatPrice(price: string) {
  let resultString
  const priceToUs = price.replace(',', '.')

  if (Number.isInteger(parseFloat(priceToUs))) {
    resultString = priceToUs + '.00'
  } else {
    resultString = priceToUs.toString()
  }

  return resultString
}
