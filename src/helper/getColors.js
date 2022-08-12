export function getColors(products) {
  const colors = [];
  for(const product of products) {
    if (!colors.includes(product.color)) {
      colors.push(product.color)
    }
  }
  return colors;
}
