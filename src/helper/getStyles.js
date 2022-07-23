export function getStyles(products) {

  const style = [];
  for(const product of products) {
    if (!style.includes(product.style)) {
      style.push(product.style)
    }
  }
  return style;
}
