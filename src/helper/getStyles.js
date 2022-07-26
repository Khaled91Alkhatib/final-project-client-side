export function getStyles(products) {

  const styles = [];
  for(const product of products) {
    if (!styles.includes(product.style)) {
      styles.push(product.style)
    }
  }
  return styles;
}
