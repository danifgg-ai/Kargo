/**
 * Bancard VPOS configuration
 * https://vpos.infonet.com.py — Paraguayan payment gateway
 */

export const bancardConfig = {
  publicKey: process.env.BANCARD_PUBLIC_KEY || '',
  privateKey: process.env.BANCARD_PRIVATE_KEY || '',
  baseUrl: process.env.NEXT_PUBLIC_BANCARD_BASE_URL || 'https://vpos.infonet.com.py',
  returnUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success`,
  cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/cancel`,
}

export const BANCARD_ENDPOINTS = {
  singleBuy: '/vpos/api/0.3/single_buy',
  singleBuyConfirm: '/vpos/api/0.3/single_buy/confirmations',
  singleBuyRollback: '/vpos/api/0.3/single_buy/rollbacks',
  paymentForm: '/button/payment',
} as const
