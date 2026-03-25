/**
 * Format Paraguayan phone number with +595 prefix
 */
export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('595')) {
    return `+${digits}`
  }
  if (digits.startsWith('0')) {
    return `+595${digits.slice(1)}`
  }
  return `+595${digits}`
}

/**
 * Validate Paraguayan phone number
 */
export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  // Paraguay numbers: +595 + 9 digits (mobile) or +595 + 7-8 digits (landline)
  return /^(595)?\d{7,10}$/.test(cleaned)
}
