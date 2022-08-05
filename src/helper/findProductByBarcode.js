export function findProductByBarcode(products, barcode) {
  if (barcode) {
    return products.filter(product => product.barcode === barcode)[0]
  }
}
