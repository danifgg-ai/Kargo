/**
 * Format amount in Paraguayan Guaraníes
 * formatGuaranies(1500000) → "Gs. 1.500.000"
 */
export const formatGuaranies = (amount: number): string => {
  return `Gs. ${amount.toLocaleString('es-PY')}`
}

/**
 * Calculate IVA (10% in Paraguay) with desglose
 */
export const calculateIVA = (subtotal: number) => ({
  subtotal,
  iva: Math.round(subtotal * 0.1),
  total: Math.round(subtotal * 1.1),
})

/**
 * Parse formatted guaraníes string back to number
 */
export const parseGuaranies = (formatted: string): number => {
  return parseInt(formatted.replace(/[^\d]/g, ''), 10) || 0
}
