export function formatCurrency(value) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value)
  } catch (e) {
    return `$${Number(value).toFixed(2)}`
  }
}