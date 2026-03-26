import { createHash } from 'crypto'
import { bancardConfig } from './config'

/**
 * Generate Bancard VPOS MD5 token
 * Token = MD5(private_key + shop_process_id + amount + currency)
 */
export function generateBancardToken(
  shopProcessId: string,
  amount: string,
  currency: string = 'PYG'
): string {
  const raw = `${bancardConfig.privateKey}${shopProcessId}${amount}${currency}`
  return createHash('md5').update(raw).digest('hex')
}

/**
 * Generate confirmation token
 * Token = MD5(private_key + shop_process_id + "confirm")
 */
export function generateConfirmToken(shopProcessId: string): string {
  const raw = `${bancardConfig.privateKey}${shopProcessId}confirm`
  return createHash('md5').update(raw).digest('hex')
}

/**
 * Generate rollback token
 * Token = MD5(private_key + shop_process_id + "rollback")
 */
export function generateRollbackToken(shopProcessId: string): string {
  const raw = `${bancardConfig.privateKey}${shopProcessId}rollback`
  return createHash('md5').update(raw).digest('hex')
}
