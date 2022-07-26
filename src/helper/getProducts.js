export function getProducts(products, cat, style, color) {

  if (color) {
    if (style) {
      return products.filter(product => {
        return (product.category.toLowerCase() === cat.toLowerCase() && product.color === color && product.style === style);
      });
    } else {
      return products.filter(product => {
        return (product.category.toLowerCase() === cat.toLowerCase() && product.color === color);
      });
    }
  }

  if (style) {
    return products.filter(product => {
      return (product.disp && product.category.toLowerCase() === cat.toLowerCase() && product.style === style)
    })
  }

  return products.filter(product => {
    return (product.disp && product.category.toLowerCase() === cat.toLowerCase())
  })

}