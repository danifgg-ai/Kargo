import { bancardConfig, BANCARD_ENDPOINTS } from './config'
import { generateBancardToken, generateConfirmToken } from './token'

export interface SingleBuyRequest {
  shopProcessId: string
  amount: number
  description: string
  currency?: string
}

export interface SingleBuyResponse {
  status: string
  process_id: string
  redirect_url?: string
}

/**
 * Initiate a single buy on Bancard VPOS
 * Returns a process_id to redirect user to Bancard payment form
 */
export async function initiateSingleBuy({
  shopProcessId,
  amount,
  description,
  currency = 'PYG',
}: SingleBuyRequest): Promise<SingleBuyResponse> {
  const amountStr = amount.toFixed(2)
  const token = generateBancardToken(shopProcessId, amountStr, currency)

  const payload = {
    public_key: bancardConfig.publicKey,
    operation: {
      token,
      shop_process_id: shopProcessId,
      amount: amountStr,
      currency,
      additional_data: '',
      description,
      return_url: bancardConfig.returnUrl,
      cancel_url: bancardConfig.cancelUrl,
    },
  }

  const response = await fetch(
    `${bancardConfig.baseUrl}${BANCARD_ENDPOINTS.singleBuy}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )

  if (!response.ok) {
    throw new Error(`Bancard API error: ${response.status}`)
  }

  const data = await response.json()

  if (data.status !== 'success') {
    throw new Error(data.messages?.[0]?.dsc || 'Error al procesar pago')
  }

  return {
    status: data.status,
    process_id: data.process_id,
    redirect_url: `${bancardConfig.baseUrl}${BANCARD_ENDPOINTS.paymentForm}?process_id=${data.process_id}`,
  }
}

/**
 * Confirm a payment after Bancard webhook callback
 */
export async function confirmPayment(shopProcessId: string) {
  const token = generateConfirmToken(shopProcessId)

  const payload = {
    public_key: bancardConfig.publicKey,
    operation: {
      token,
      shop_process_id: shopProcessId,
    },
  }

  const response = await fetch(
    `${bancardConfig.baseUrl}${BANCARD_ENDPOINTS.singleBuyConfirm}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )

  if (!response.ok) {
    throw new Error(`Bancard confirm error: ${response.status}`)
  }

  return response.json()
}
