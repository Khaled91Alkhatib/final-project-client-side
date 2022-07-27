export function getProducts(products, cat, style, color, priceRangeString) {

  let productInRange = products.filter(product => {
    return (product.category.toLowerCase() === cat.toLowerCase())
  })

  if (priceRangeString) {
    const priceRange = priceRangeString.split(',');
    productInRange = productInRange.filter(product => {
      return (product.price >= (Number(priceRange[0]) * 100) && product.price <= (Number(priceRange[1]) * 100))
    })
  }

  if (color) {
    if (style) {
      return productInRange.filter(product => {
        return (product.color === color && product.style === style);
      });
    } else {
      return productInRange.filter(product => {
        return (product.color === color);
      });
    }
  }

  if (style) {
    return productInRange.filter(product => {
      return (product.disp && product.style === style)
    })
  }

  return productInRange.filter(product => {
    return (product.disp)
  })

}