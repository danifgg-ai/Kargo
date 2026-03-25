/**
 * Validate Paraguayan RUC format: XXXXXXXX-X (6-8 digits, dash, 1 digit)
 */
export const validateRUC = (ruc: string): boolean => {
  return /^\d{6,8}-\d{1}$/.test(ruc)
}

/**
 * Format RUC input with auto-dash
 */
export const formatRUC = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 8) {
    return digits
  }
  return `${digits.slice(0, -1)}-${digits.slice(-1)}`
}
